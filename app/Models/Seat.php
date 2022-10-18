<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'number',
        'row',
        'column',
        'vip',
    ];

    /**
     * Get the Hall for the Seat.
     */
    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
