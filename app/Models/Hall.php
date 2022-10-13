<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;

    /**
     * Get the movies for the hall.
     */
    public function movies()
    {
        return $this->hasMany(Movie::class);
    }
}
