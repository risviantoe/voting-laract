<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voting>
 */
class VotingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'pilihan_1' => fake()->name(),
            'pilihan_2' => fake()->name(),
            'pilihan_3' => fake()->name(),
            'pilihan_4' => fake()->name(),
            'pilihan_5' => fake()->name(),
            'token' => Str::random(10),
        ];
    }
}
