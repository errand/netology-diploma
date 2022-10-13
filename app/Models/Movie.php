<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    /**
     * Get the movies for the hall.
     */
    public function halls()
    {
        return $this->hasMany(Hall::class);
    }
}
