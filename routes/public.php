<?php

use App\Http\Controllers\PublicSiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicSiteController::class, 'index'])->name('home');
Route::get('/servicios', [PublicSiteController::class, 'services'])->name('public.services');
Route::get('/contacto', [PublicSiteController::class, 'contact'])->name('public.contact');
Route::get('/registrar-mascota', [PublicSiteController::class, 'registrarMascota'])->name('public.registrar-mascota');
Route::post('/registrar-mascota', [PublicSiteController::class, 'storeMascota'])->name('public.store-mascota');
