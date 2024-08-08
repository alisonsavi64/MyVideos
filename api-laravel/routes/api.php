<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistVideosController;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/logout', [AuthController::class, 'logout']);
Route::post('auth/refresh', [AuthController::class, 'refresh']);
Route::get('auth/me', [AuthController::class, 'me'])->middleware('auth:api');

Route::post('user', [UserController::class, 'store']);

Route::group(['middleware' => 'auth:api', 'prefix' => 'user'], function () {
    Route::get('/', [UserController::class, 'edit']);
    Route::put('/', [UserController::class, 'update']);
    Route::delete('/', [UserController::class, 'destroy']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'video'], function () {
    Route::post('/', [VideoController::class, 'store']);
    Route::get('/', [VideoController::class, 'all']);
    Route::get('/{id}', [VideoController::class, 'edit']);
    Route::get('/playlist/{id}', [VideoController::class, 'allFromPlaylist']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'categories'], function () {
    Route::get('/', [CategoriesController::class, 'all']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'comments'], function () {
    Route::post('/', [CommentsController::class, 'store']);
    Route::get('/{id}', [CommentsController::class, 'all']);
    Route::delete('/{id}', [CommentsController::class, 'delete']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'playlist'], function () {
    Route::post('/', [PlaylistController::class, 'store']);
    Route::get('/', [PlaylistController::class, 'all']);
    Route::get('/{id}', [PlaylistController::class, 'edit']);
    Route::delete('/{id}', [PlaylistController::class, 'delete']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'playlist/videos'], function () {
    Route::post('/', [PlaylistVideosController::class, 'store']);
    Route::get('/{id}', [PlaylistVideosController::class, 'edit']);
    Route::delete('/{playlistId}/{videoId}', [PlaylistVideosController::class, 'delete']);
});
