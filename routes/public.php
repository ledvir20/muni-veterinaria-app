<?php

use App\Http\Controllers\PublicSiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicSiteController::class, 'index'])->name('home');
Route::get('/servicios', [PublicSiteController::class, 'services'])->name('public.services');
Route::get('/contacto', [PublicSiteController::class, 'contact'])->name('public.contact');