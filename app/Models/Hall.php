<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
    public function movies(): HasManyThrough
    {
        return $this->hasManyThrough(Movie::class, Showtime::class);
    }


    /**
     * Get the showtimes for the movie.
     */
    public function showtimes(): HasMany
    {
        return $this->hasMany(Showtime::class);
    }

    /**
     * Get the Seats for the Hall.
     */
    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class);
    }

    /**
     * Get the Showtime Hall.
     */
    public function showtime(): HasOne
    {
        return $this->hasOne(Showtime::class);
    }

    /**
     * Delete Seats in the Hall on Hall delete
     */
    public function delete(): ?bool
    {
        $this->seats()->delete();
        return parent::delete();
    }
}
