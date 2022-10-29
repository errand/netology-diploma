<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'extraClass' => 'client',
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['verified', 'auth'])->group(function () {

    Route::get('/manager', '\App\Http\Controllers\HallController@index')->name('manager');

    /*
     * Halls
     */
    Route::post('halls', '\App\Http\Controllers\HallController@store')->name('halls.store');
    Route::get('halls/{id}','\App\Http\Controllers\HallController@show')->name('halls.show');
    Route::delete('halls/{id}','\App\Http\Controllers\HallController@destroy')->name('halls.destroy');

    /*
     * Seats
     */
    Route::post('seats', '\App\Http\Controllers\SeatController@store')->name('seats.store');
    Route::post('seats/{id}/vip', '\App\Http\Controllers\SeatController@toggleVip')->name('seats.toggleVip');
    Route::get('seats/{id}','\App\Http\Controllers\SeatController@show')->name('seats.show');
    Route::get('seats/hall/{hall_id}','\App\Http\Controllers\SeatController@showSeatsInHall')->name('seats.showSeatsInHall');

});


require __DIR__.'/auth.php';
