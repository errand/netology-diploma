<?php

namespace App\Http\Controllers;

use App\Interfaces\HallRepositoryInterface;
use App\Http\Requests\StoreHallRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
     * @return Response
     */
    public function index(): Response
    {
        $halls = $this->hallRepository->all();

        return Inertia::render('Manager', [
            'extraClass' => 'admin',
            'halls' => $halls
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreHallRequest $request
     * @return RedirectResponse
     */
    public function store(StoreHallRequest $request): RedirectResponse
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
        return $this->hallRepository->findById($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->hallRepository->destroy($id);
        return redirect()->route('manager');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response|Request
     */
    public function updateHallRows(Request $request, int $id): Response|Request
    {
        $hall = $this->hallRepository->findById($id);

        if ($request->rows || $request->seats_in_row) {
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
        $hall = $this->hallRepository->findById($id);

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
        $hall = $this->hallRepository->findById($id);

        $hall->update(['open_sale' => true]);
        $hall->save();
        return $request;
    }
}
