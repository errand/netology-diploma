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

Route::get('/','\App\Http\Controllers\ShowtimeController@index')->name('welcome');

/*
 * Pick a showtime
 * */

Route::get('showtime/{id}', '\App\Http\Controllers\ShowtimeController@show')->name('showtime.show');
Route::get('showtime/{id}/payment', '\App\Http\Controllers\ShowtimeController@payment')->name('showtime.payment');

Route::middleware(['verified', 'auth'])->group(function () {

    Route::get('/manager', '\App\Http\Controllers\HallController@index')->name('manager');


    /*
     * Halls
     */
    Route::post('halls', '\App\Http\Controllers\HallController@store')->name('halls.store');
    Route::post('halls/{id}/rows', '\App\Http\Controllers\HallController@updateHallRows')->name('halls.updateHallRows');
    Route::post('halls/{id}/price', '\App\Http\Controllers\HallController@updateHallPrice')->name('halls.updateHallPrice');
    Route::post('halls/{id}', '\App\Http\Controllers\HallController@setActive')->name('halls.setActive');
    Route::get('halls/{id}','\App\Http\Controllers\HallController@show')->name('halls.show');
    Route::delete('halls/{id}','\App\Http\Controllers\HallController@destroy')->name('halls.destroy');

    /*
     * Seats
     */
    Route::post('seats', '\App\Http\Controllers\SeatController@store')->name('seats.store');
    Route::post('seats/{id}/vip', '\App\Http\Controllers\SeatController@toggleSeat')->name('seats.toggleSeat');
    Route::get('seats/{id}','\App\Http\Controllers\SeatController@show')->name('seats.show');
    Route::get('seats/hall/{hall_id}','\App\Http\Controllers\SeatController@showSeatsInHall')->name('seats.showSeatsInHall');

    /*
     * Movies
     */
    Route::get('movies', '\App\Http\Controllers\MovieController@index')->name('movies.index');
    Route::post('movies', '\App\Http\Controllers\MovieController@store')->name('movies.store');

    /*
     * Showtime
     */
    Route::get('showtimes', '\App\Http\Controllers\ShowtimeController@showtimes')->name('showtimes.showtimes');
    Route::post('showtimes', '\App\Http\Controllers\ShowtimeController@store')->name('showtimes.store');


});


require __DIR__.'/auth.php';
