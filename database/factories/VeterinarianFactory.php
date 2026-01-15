<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class VeterinarianFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'license_number' => fake()->word(),
            'specialty' => fake()->word(),
            'is_active' => fake()->boolean(),
        ];
    }
}
