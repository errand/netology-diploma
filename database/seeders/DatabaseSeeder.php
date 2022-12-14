<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
             'name' => 'Test User',
             'email' => 'asdf@asdf.asdf',
            'password' => '$2y$10$3nBNTMKmqmlGOpnMwNhybeldWRw6Jb5fAWBtzMy7ni/1NXNnPJBZ.'
         ]);
    }
}
