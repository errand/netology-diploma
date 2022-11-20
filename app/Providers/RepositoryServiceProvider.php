<?php

namespace App\Providers;

use App\Interfaces\SeatRepositoryInterface;
use App\Interfaces\ShowtimeRepositoryInterface;
use App\Repositories\SeatRepository;
use App\Repositories\ShowtimeRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\HallRepositoryInterface;
use App\Interfaces\MovieRepositoryInterface;
use App\Repositories\HallRepository;
use App\Repositories\MovieRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            HallRepositoryInterface::class,
            HallRepository::class,
        );

        $this->app->bind(
            MovieRepositoryInterface::class,
            MovieRepository::class,
        );

        $this->app->bind(
            SeatRepositoryInterface::class,
            SeatRepository::class,
        );

        $this->app->bind(
            ShowtimeRepositoryInterface::class,
            ShowtimeRepository::class,
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
