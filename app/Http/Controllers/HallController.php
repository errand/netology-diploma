<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHallRequest;
use App\Models\Hall;
use App\Models\Seat;
use App\Http\Requests\UpdateHallRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $halls = DB::table('halls')->paginate(10);

        return Inertia::render('Manager', [
            'extraClass' => 'admin',
            'halls' => $halls
        ]);
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
     * @param  \App\Http\Requests\StoreHallRequest  $request
     * @return \Inertia\Response
     */
    public function store(StoreHallRequest $request)
    {

        $hall = new Hall($request->validated());
        $hall->save();

        $seatsNumber = $request->input('rows') * $request->input('seats_in_row');

        for ($i = 1; $i < $seatsNumber + 1; $i++) {

            $seat = new Seat(['number' => $i]);

            $hall->seats()->save($seat);

        }

        return redirect()->route('manager')->with('message', 'Post Delete Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $hall = Hall::find($id)->first();
        $halls = DB::table('halls')->paginate(10);

        return Inertia::render('Manager', [
            'extraClass' => 'admin',
            'halls' => $halls,
            'activeHall' => $hall,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hall  $hall
     * @return \Illuminate\Http\Response
     */
    public function edit(Hall $hall)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHallRequest  $request
     * @param  \App\Models\Hall  $hall
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHallRequest $request, Hall $hall)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Hall::destroy($id);
        return redirect()->route('manager');
    }
}
