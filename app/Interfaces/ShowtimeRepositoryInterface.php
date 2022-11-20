<?php

namespace App\Interfaces;

interface ShowtimeRepositoryInterface
{
    public function all();
    public function findById(int $id);
    public function destroy(int $id);
}
