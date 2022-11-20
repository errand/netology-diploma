<?php

namespace App\Interfaces;

interface SeatRepositoryInterface
{
    public function all();
    public function findById(int $id);
    public function seatsInHall(int $id);
}
