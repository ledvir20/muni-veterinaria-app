<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Pet;
use App\Models\Veterinarian;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicalRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'pet_id' => Pet::factory(),
            'veterinarian_id' => Veterinarian::factory(),
            'appointment_id' => Appointment::factory(),
            'type' => fake()->randomElement(["consulta","emergencia","control","vacunacion"]),
            'diagnosis' => fake()->word(),
            'description' => fake()->text(),
            'weight_at_visit' => fake()->randomFloat(2, 0, 999.99),
            'next_visit_date' => fake()->date(),
            'attachments' => '{}',
        ];
    }
}
