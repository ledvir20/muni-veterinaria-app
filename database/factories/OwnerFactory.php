<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OwnerFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'dni' => fake()->randomLetter(),
            'full_name' => fake()->word(),
            'phone' => fake()->phoneNumber(),
            'district' => fake()->word(),
            'address' => fake()->word(),
        ];
    }
}
