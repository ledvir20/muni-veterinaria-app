<?php

namespace Database\Factories;

use App\Models\Pet;
use App\Models\Veterinarian;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'pet_id' => Pet::factory(),
            'veterinarian_id' => Veterinarian::factory(),
            'scheduled_at' => fake()->dateTime(),
            'status' => fake()->randomElement(["pendiente","confirmada","atendida","cancelada"]),
            'reason' => fake()->word(),
        ];
    }
}
