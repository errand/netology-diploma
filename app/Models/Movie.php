<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    /**
     * Get the halls for the movie.
     */
    public function halls()
    {
        return $this->hasManyThrough(Hall::class, Showtime::class);
    }

    /**
     * Get the showtimes for the movie.
     */
    public function showtimes()
    {
        return $this->hasMany(Showtime::class);
    }
}
