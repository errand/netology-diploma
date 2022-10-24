<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Http\Requests\StoreSeatRequest;
use App\Http\Requests\UpdateSeatRequest;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSeatRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function showSeatsInHall($hall_id)
    {
        return Seat::where('hall_id', $hall_id)->get();

    }

    /**
     * Set VIP flag to Seat ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function setVip($id, $hall_id)
    {
        $seat = Seat::find($id);
        $seat->update(['vip' => true]);
        return Seat::where('hall_id', $hall_id)->get();

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSeatRequest $request, Seat $seat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seat $seat)
    {
        //
    }
}
