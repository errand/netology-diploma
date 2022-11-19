<?php

namespace App\Repositories;

use App\Interfaces\HallRepositoryInterface;
use App\Models\Hall;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class HallRepository implements HallRepositoryInterface
{
    /**
     * Get all Halls paginated
     *
     * @return Response
     */

    public function getAllHalls()
    {
        return DB::table('halls')->paginate(10);
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
}
