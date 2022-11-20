<?php

namespace App\Repositories;

use App\Interfaces\ShowtimeRepositoryInterface;
use App\Models\Showtime;
use Illuminate\Database\Eloquent\Collection;

class ShowtimeRepository implements ShowtimeRepositoryInterface
{
    /**
     * Get all Showtime
     *
     * @return Collection
     */

    public function all(): Collection
    {
        return Showtime::all();
    }

    /**
     * Get Showtime by id
     *
     * @param int $id
     * @return mixed
     */

    public function findById(int $id): mixed
    {
        return Showtime::find($id);
    }

    /**
     * Destroy Showtime by id
     *
     * @param int $id
     * @return mixed
     * */
    public function destroy(int $id): int
    {
        return Showtime::destroy($id);
    }
}
