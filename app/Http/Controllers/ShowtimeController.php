<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Movie;
use App\Models\Showtime;
use App\Http\Requests\StoreShowtimeRequest;
use App\Http\Requests\UpdateShowtimeRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ShowtimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {

        $showtimes = Showtime::all();
        $halls = Hall::all();
        $movies = Movie::all();

        return Inertia::render('Welcome', [
            'extraClass' => 'client',
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'showtimes' => $showtimes,
            'halls' => $halls,
            'movies' => $movies,
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     */
    public function showtimes()
    {
        return Showtime::all();
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
     * @param  \App\Http\Requests\StoreShowtimeRequest  $request
     * @return StoreShowtimeRequest
     */
    public function store(StoreShowtimeRequest $request)
    {
        $showtime = new Showtime($request->validated());
        $showtime->save();

        return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  integer $id
     * @return \Inertia\Response
     */
    public function show(int $id)
    {
        $showtime = Showtime::find($id);
        $hall = $showtime->hall()->first();
        $seats = $hall->seats;
        $movie = $showtime->movie()->first();

        return Inertia::render('ShowtimeSelect', [
            'extraClass' => 'client',
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'showtime' => $showtime,
            'hall' => $hall,
            'movie' => $movie,
            'seats' => $seats,
        ]);
    }

    public function payment(Request $request) {
        return Inertia::render('ShowtimePayment', [
            'extraClass' => 'client',
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'data' => $request,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Showtime  $showtime
     * @return Response
     */
    public function edit(Showtime $showtime)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateShowtimeRequest  $request
     * @param  \App\Models\Showtime  $showtime
     * @return Response
     */
    public function update(UpdateShowtimeRequest $request, Showtime $showtime)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Showtime  $showtime
     * @return Response
     */
    public function destroy(Showtime $showtime)
    {
        //
    }
}
