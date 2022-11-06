<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'rows',
        'seats_in_row',
        'vip_price',
        'common_price',
        'open_sale',
    ];

    /**
     * Get the movies for the hall.
     */
    public function movies()
    {
        return $this->hasManyThrough(Movie::class, Showtime::class);
    }


    /**
     * Get the showtimes for the movie.
     */
    public function showtimes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Showtime::class);
    }

    /**
     * Get the Seats for the Hall.
     */
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    /**
     * Delete Seats in the Hall on Hall delete
     */
    public function delete()
    {
        $this->seats()->delete();
        return parent::delete();
    }
}
