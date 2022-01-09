<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        foreach (range(1,10) as $index) {
            DB::table("employees")->insert([
            "first_name" => $faker->name(),
            "last_name" => $faker->name(),
            "email" => $faker->safeEmail,
            "phone_no" => $faker->numerify('601#########'),
            "join_date" =>  $faker->date('Y_m_d'),
            "job_title" => $faker->randomElement(["developer manager", "general manager"]),
            "manager_id" => $faker->numerify('MA#####'),
            "updated_at" => $faker->dateTimeBetween('-1 week', '+1 week'),
            "created_at" => $faker->dateTimeBetween('-1 week', '+1 week'),
        ]);

        }
    }
}

