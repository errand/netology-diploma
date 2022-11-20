<?php

namespace App\Http\Controllers;

use App\Interfaces\HallRepositoryInterface;
use App\Interfaces\MovieRepositoryInterface;
use App\Interfaces\ShowtimeRepositoryInterface;
use App\Models\Showtime;
use App\Http\Requests\StoreShowtimeRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

class ShowtimeController extends Controller
{
    private ShowtimeRepositoryInterface $showtimeRepository;
    private HallRepositoryInterface $hallRepository;
    private MovieRepositoryInterface $movieRepository;

    public function __construct(ShowtimeRepositoryInterface $showtimeRepository,
                                HallRepositoryInterface $hallRepository,
                                MovieRepositoryInterface $movieRepository)
    {
        $this->showtimeRepository = $showtimeRepository;
        $this->hallRepository = $hallRepository;
        $this->movieRepository = $movieRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {

        $showtimes = $this->showtimeRepository->all();
        $halls = $this->hallRepository->all();
        $movies = $this->movieRepository->all();

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
     * List all Showtime models
     *
     * @return Collection
     */

    public function showtimes(): Collection
    {
        return $this->showtimeRepository->all();
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
     * @param integer $id
     * @return Response
     */
    public function show(int $id): Response
    {
        $showtime = $this->showtimeRepository->findById($id);
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
