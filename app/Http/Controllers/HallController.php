<?php

namespace App\Http\Controllers;

use App\Interfaces\HallRepositoryInterface;
use App\Http\Requests\StoreHallRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HallController extends Controller
{
    private HallRepositoryInterface $hallRepository;

    public function __construct(HallRepositoryInterface $hallRepository)
    {
        $this->hallRepository = $hallRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $halls = $this->hallRepository->getAllHalls();

        return Inertia::render('Manager', [
            'extraClass' => 'admin',
            'halls' => $halls
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreHallRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreHallRequest $request): \Illuminate\Http\RedirectResponse
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
     * @param int $id
     * @return mixed
     */
    public function show(int $id)
    {
        return Hall::find($id);
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
