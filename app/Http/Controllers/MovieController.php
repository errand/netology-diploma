<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\StoreMovieRequest;
use Illuminate\Http\Response;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Movie::all();
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
