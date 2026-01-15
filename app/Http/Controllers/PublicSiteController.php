<?php

namespace App\Http\Controllers;

use Laravel\Fortify\Features;

class PublicSiteController extends Controller
{
    public function index()
    {
        return inertia('public/home', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    public function registrarMascota()
    {
        return inertia('public/registrar-mascota');
    }

    public function storeMascota()
    {
        // 1. Validamos TODO junto
        $validated = $request->validate([
            // Mascota
            'petName' => 'required|string|max:100',
            'species' => 'required|in:perro,gato,otro',
            'breed' => 'nullable|string|max:100',
            'age' => 'required|integer|min:0',
            'ageUnit' => 'required|in:meses,años',
            'gender' => 'required|in:macho,hembra',
            'photo' => 'nullable|image|max:5120', // 5MB max

            // Propietario
            'ownerName' => 'required|string|max:255',
            'ownerDni' => 'required|digits:8', // Asumiendo validación simple
            'ownerEmail' => 'required|email',
            'ownerPhone' => 'nullable|string',
            'ownerDistrict' => 'required|string',
            'ownerAddress' => 'required|string',
        ]);

        try {
            DB::transaction(function () use ($request) {

                // PASO A: Lógica del Usuario/Propietario
                // Opción 1: Crear usuario nuevo si no existe (simplificado)
                // En un sistema real, quizás busques por DNI primero.

                $user = User::firstOrCreate(
                    ['email' => $request->ownerEmail],
                    [
                        'name' => $request->ownerName,
                        'password' => Hash::make($request->ownerDni), // Pass temporal = DNI
                    ]
                );

                // Asignar rol de dueño (Spatie)
                $user->assignRole('dueño_mascota');

                // Crear o Actualizar el perfil de Propietario
                $owner = Owner::updateOrCreate(
                    ['dni' => $request->ownerDni],
                    [
                        'user_id' => $user->id,
                        'full_name' => $request->ownerName,
                        'phone' => $request->ownerPhone,
                        'district' => $request->ownerDistrict,
                        'address' => $request->ownerAddress,
                    ]
                );

                // PASO B: Manejo de la Foto
                $photoPath = null;
                if ($request->hasFile('photo')) {
                    // Guarda en storage/app/public/pets
                    $photoPath = $request->file('photo')->store('pets', 'public');
                }

                // PASO C: Crear la Mascota
                $owner->pets()->create([
                    'name' => $request->petName,
                    'species' => $request->species,
                    'breed' => $request->breed,
                    'age' => $request->age,
                    'age_unit' => $request->ageUnit,
                    'gender' => $request->gender === 'macho' ? 'M' : 'H', // Mapeo al DB Enum
                    'color' => $request->color,
                    'weight' => $request->weight,
                    'microchip' => $request->microchip,
                    'is_sterilized' => $request->sterilized === 'si',
                    'vaccination_status' => $request->vaccinated,
                    'observations' => $request->observations,
                    'photo_path' => $photoPath,
                    'status' => 'pendiente', // Estado inicial
                ]);
            });

            // Redirección exitosa
            return redirect()->route('home')->with('success', 'Registro completado correctamente.');

        } catch (\Exception $e) {
            // Si algo falla, Inertia mostrará este error
            return back()->withErrors(['error' => 'Ocurrió un error al guardar: '.$e->getMessage()]);
        }
    }

    // public function services()
    // {
    //     return inertia('public/services');
    // }

    // public function contact()
    // {
    //     return inertia('public/contact');
    // }
}
