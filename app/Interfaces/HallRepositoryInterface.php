<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface HallRepositoryInterface
{
    public function getAllHalls();
    public function updateHallRows(Request $request, int $id);
    public function updateHallPrice(Request $request, int $id);
    public function setActive(Request $request, int $id);
}
