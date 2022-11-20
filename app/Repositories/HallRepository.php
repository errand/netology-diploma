<?php

namespace App\Repositories;

use App\Interfaces\HallRepositoryInterface;
use App\Models\Hall;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class HallRepository implements HallRepositoryInterface
{
    /**
     * Get all Halls
     *
     * @return Collection
     */

    public function all(): Collection
    {
        return Hall::all();
    }
    /**
     * Get all Halls paginated
     *
     * @return LengthAwarePaginator
     */

    public function allPaginated(): LengthAwarePaginator
    {
        return DB::table('halls')->paginate(10);
    }

    /**
     * Get Hall by id
     *
     * @param int $id
     * @return mixed
     */

    public function findById(int $id): mixed
    {
        return Hall::find($id);
    }

    /**
     * Destroy Hall by id
     *
     * @param int $id
     * @return mixed
     * */
    public function destroy(int $id): int
    {
        return Hall::destroy($id);
    }
}
