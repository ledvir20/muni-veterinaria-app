<?php

namespace Database\Factories;

use App\Models\Owner;
use Illuminate\Database\Eloquent\Factories\Factory;

class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'owner_id' => Owner::factory(),
            'code' => fake()->word(),
            'name' => fake()->name(),
            'species' => fake()->randomElement(["perro","gato","otro"]),
            'breed' => fake()->word(),
            'birth_date' => fake()->date(),
            'age' => fake()->numberBetween(-10000, 10000),
            'age_unit' => fake()->randomElement(["meses","anios"]),
            'gender' => fake()->randomElement(["M","H"]),
            'color' => fake()->word(),
            'weight' => fake()->randomFloat(2, 0, 999.99),
            'microchip' => fake()->word(),
            'is_sterilized' => fake()->boolean(),
            'vaccination_status' => fake()->randomElement(["si","no","parcial"]),
            'observations' => fake()->text(),
            'photo_path' => fake()->word(),
            'status' => fake()->randomElement(["pendiente","validado","rechazado"]),
            'rejection_reason' => fake()->text(),
        ];
    }
}
