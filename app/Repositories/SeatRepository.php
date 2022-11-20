<?php

namespace App\Repositories;

use App\Interfaces\SeatRepositoryInterface;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Collection;

class SeatRepository implements SeatRepositoryInterface
{
    /**
     * Get all Halls paginated
     *
     * @return Collection
     */

    public function all(): Collection
    {
        return Seat::all();
    }

    /**
     * Get Seat by id
     *
     * @param int $id
     * @return mixed
     */

    public function findById(int $id): mixed
    {
        return Seat::find($id);
    }

    /**
     * Get Seats by Hall id
     *
     * @param int $id
     * @return Collection
     */
    public function seatsInHall(int $id): Collection
    {
        return Seat::where('hall_id', $id)->get();
    }
}
