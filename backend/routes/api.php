
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', 'App\Http\Controllers\EmployeesController@list')->name('list');
Route::get('/{id}/details', 'App\Http\Controllers\EmployeesController@details')->name('details');
Route::post('/add', 'App\Http\Controllers\EmployeesController@create')->name('create');
Route::post('/{id}/update', 'App\Http\Controllers\EmployeesController@update')->name('update');
Route::delete('/{id}', 'App\Http\Controllers\EmployeesController@delete')->name('delete');
