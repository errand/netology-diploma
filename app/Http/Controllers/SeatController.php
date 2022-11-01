<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Http\Requests\StoreSeatRequest;
use App\Http\Requests\UpdateSeatRequest;
use Illuminate\Http\Response;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSeatRequest  $request
     * @return Response
     */
    public function store(StoreSeatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Seat::find($id)->first();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $hall_id
     * @param  int  $number
     * @return Response
     */
    public function showSeatsInHall($hall_id)
    {
        return Seat::where('hall_id', $hall_id)->get();

    }

    /**
     * Set VIP flag to Seat ID.
     *
     * @param  int  $seat_id
     * @return Response
     */
    public function toggleSeat($seat_id)
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Seat  $seat
     * @return Response
     */
    public function edit(Seat $seat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSeatRequest  $request
     * @param  \App\Models\Seat  $seat
     * @return Response
     */
    public function update(UpdateSeatRequest $request, Seat $seat)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seat  $seat
     * @return Response
     */
    public function destroy(Seat $seat)
    {
        //
    }
}
