<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Interfaces\MovieRepositoryInterface;
use App\Http\Requests\StoreMovieRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;

class MovieController extends Controller
{
    private MovieRepositoryInterface $movieRepository;

    public function __construct(MovieRepositoryInterface $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index(): Collection
    {
        $this->movieRepository->all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMovieRequest $request
     */
    public function store(StoreMovieRequest $request)
    {
        if($request->file('poster')){
            $path = $request->file('poster')->store('posters', 'public');
        }
        $movie = new Movie([
            'name' => $request->name,
            'poster' => $path,
            'description' => $request->description,
            'duration' => $request->duration,
            'country' => $request->country,
        ]);
        $movie->save();

        return redirect()->route('manager')->withFragment('#movies');
    }

}
