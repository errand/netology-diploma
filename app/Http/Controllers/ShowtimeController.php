<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Movie;
use App\Models\Showtime;
use App\Http\Requests\StoreShowtimeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ShowtimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
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
     * Store a newly created resource in storage.
     *
     * @param StoreShowtimeRequest $request
     * @return StoreShowtimeRequest
     */
    public function store(StoreShowtimeRequest $request): StoreShowtimeRequest
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
    public function show(int $id): \Inertia\Response
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

    public function payment(Request $request): \Inertia\Response
    {
        return Inertia::render('ShowtimePayment', [
            'extraClass' => 'client',
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'data' => $request,
        ]);
    }

}
