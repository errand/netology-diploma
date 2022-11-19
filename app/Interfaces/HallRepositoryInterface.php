<?php

namespace App\Interfaces;

interface HallRepositoryInterface
{
    public function all();
    public function findById(int $id);
    public function destroy(int $id);
}
