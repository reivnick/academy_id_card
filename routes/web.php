<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('idCardGenerator');
})->name('home');

//Route::get('/id-card', function () {
//    return Inertia::render('IdCardGenerator');
//});
