<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'hall_id',
        'movie_id',
        'time',
    ];
    /**
     * Get the Showtime Movie.
     */
    public function movie(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Movie::class);
    }
}
