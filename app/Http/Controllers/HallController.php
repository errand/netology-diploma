<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHallRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $halls = DB::table('halls')->paginate(10);

        return Inertia::render('Manager', [
            'extraClass' => 'admin',
            'halls' => $halls
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreHallRequest $request
     * @return \Inertia\Response
     */
    public function store(StoreHallRequest $request): \Inertia\Response
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
     * @return Response
     */
    public function show($id): Response
    {
        return Hall::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response|Request
     */
    public function updateHallRows(Request $request, int $id): Response|Request
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
     * @param Request $request
     * @param int $id
     * @return Response|Request
     */
    public function updateHallPrice(Request $request, int $id): Response|Request
    {
        $hall = Hall::find($id);

        $hall->update(['vip_price' => $request->vipPrice, 'common_price' => $request->price]);
        $hall->save();
        return $request;
    }

    /**
     * Set Active Hall
     *
     * @param Request $request
     * @param int $id
     * @return Response|Request
     */
    public function setActive(Request $request, int $id): Response|Request
    {
        $hall = Hall::find($id);

        $hall->update(['open_sale' => true]);
        $hall->save();
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        Hall::destroy($id);
        return redirect()->route('manager');
    }
}
