<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHallRequest;
use Illuminate\Http\Request;
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

        return redirect()->route('manager')->with('message', 'Post stored Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Hall::find($id);
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
     * @param  int $hall
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHallRequest $request, int $hall)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param  int $rows
     * @param  int $seats
     * @return \Illuminate\Http\Response
     */
    public function updateHallRows(Request $request, $id): \Illuminate\Http\Response|Request
    {
        $hall = Hall::find($id);

        if($request->rows || $request->seats_in_row) {
            $hall->seats()->delete();
        }

        $seatsNumber = $request->rows * $request->seats_in_row;

        for ($i = 1; $i < $seatsNumber + 1; $i++) {

            $seat = new Seat(['number' => $i]);

            $hall->seats()->save($seat);

        }

        $hall->update(['rows' => $request->rows, 'seats_in_row' => $request->seats_in_row]);
        $hall->save();
        return $request;
    }

    /**
     * Update Hall prices
     *
     * @param int $id
     * @param  int $vipPrice
     * @param  int $price
     * @return \Illuminate\Http\Response
     */
    public function updateHallPrice(Request $request, int $id): \Illuminate\Http\Response|Request
    {
        $hall = Hall::find($id);

        $hall->update(['vip_price' => $request->vipPrice, 'common_price' => $request->price]);
        $hall->save();
        return $request;
    }

    /**
     * Set Active Hall
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function setActive(Request $request, int $id): \Illuminate\Http\Response|Request
    {
        $hall = Hall::find($id);

        $hall->update(['open_sale' => true]);
        $hall->save();
        return $request;
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
