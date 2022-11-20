<?php

namespace App\Repositories;

use App\Interfaces\MovieRepositoryInterface;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Collection;

class MovieRepository implements MovieRepositoryInterface
{
    /**
     * Get all Halls paginated
     *
     * @return Collection
     */

    public function all(): Collection
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
     * @param int $id
     * @return mixed
     *
     * */
    public function destroy(int $id): int
    {
        return Movie::destroy($id);
    }

    /**
     * Handle upload images
     *
     * @param object $file
     * @return string
     *
     */
    public function handleUploadImage(object $file): string
    {
        if(!is_null($file)){
            return $file->store('posters', 'public');
        }
    }
}
