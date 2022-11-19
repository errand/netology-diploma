<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Response;

class SeatController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id): Response
    {
        return Seat::find($id)->first();

    }

    /**
     * Display the specified resource.
     *
     * @param int $hall_id
     * @return mixed
     */
    public function showSeatsInHall(int $hall_id): mixed
    {
        return Seat::where('hall_id', $hall_id)->get();

    }

    /**
     * Set VIP flag to Seat ID.
     *
     * @param int $seat_id
     * @return mixed
     */
    public function toggleSeat(int $seat_id): mixed
    {
        $seat = Seat::find($seat_id);

        if($seat->vip && !$seat->sold) {
            $seat->update(['sold' => true, 'vip' => false]);
        } else if(!$seat->vip && !$seat->sold) {
            $seat->update(['vip' => true, 'sold' => false]);
        } else if ($seat->sold && !$seat->vip) {
            $seat->update(['vip' => false, 'sold' => false]);
        }

        return Seat::find($seat_id);

    }

}
