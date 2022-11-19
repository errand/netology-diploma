<?php

namespace App\Repositories;

use App\Interfaces\MovieRepositoryInterface;
use App\Models\Movie;

class MovieRepository implements MovieRepositoryInterface
{
    /**
     * Get all Halls paginated
     *
     * @return mixed
     */

    public function all(): mixed
    {
        return Movie::All();
    }

    /**
     * Get Hall by id
     * @param int $id
     * @return mixed
     */

    public function findById(int $id): mixed
    {
        return Movie::find($id);
    }

    /**
     * Destroy Hall by id
     *
     * */
    public function destroy(int $id): int
    {
        return Movie::destroy($id);
    }
}
