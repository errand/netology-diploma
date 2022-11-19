<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Movie;
use App\Models\Showtime;
use App\Http\Requests\StoreShowtimeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

class ShowtimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
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

    public function payment(Request $request): Response
    {
        return Inertia::render('ShowtimePayment', [
            'extraClass' => 'client',
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'data' => $request,
        ]);
    }

}
