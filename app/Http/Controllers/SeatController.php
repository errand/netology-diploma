<?php

namespace App\Http\Controllers;

use App\Interfaces\SeatRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;

class SeatController extends Controller
{
    private SeatRepositoryInterface $seatRepository;

    public function __construct(SeatRepositoryInterface $seatRepository)
    {
        $this->seatRepository = $seatRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id): Response
    {
        return $this->seatRepository->findById($id);
    }

    /**
     * Display the specified resource.
     *
     * @param int $hall_id
     * @return Collection
     */
    public function showSeatsInHall(int $hall_id): Collection
    {
        return $this->seatRepository->seatsInHall($hall_id);

    }

    /**
     * Set VIP flag to Seat ID.
     *
     * @param int $seat_id
     * @return mixed
     */
    public function toggleSeat(int $seat_id): mixed
    {
        $seat = $this->seatRepository->findById($seat_id);

        if($seat->vip && !$seat->sold) {
            $seat->update(['sold' => true, 'vip' => false]);
        } else if(!$seat->vip && !$seat->sold) {
            $seat->update(['vip' => true, 'sold' => false]);
        } else if ($seat->sold && !$seat->vip) {
            $seat->update(['vip' => false, 'sold' => false]);
        }

        return $this->seatRepository->findById($seat_id);

    }

}
