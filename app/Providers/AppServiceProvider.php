<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Desactiva el envoltorio 'data' en los recursos JSON
        // para obtener respuestas de API más limpias y directas.
        // Útil cuando el frontend (React/Vue) necesita los atributos
        // del recurso sin la clave adicional 'data'.
        // Referencia: https://laravel.com/docs/12.x/eloquent-resources#disabling-data-wrapping
        JsonResource::withoutWrapping();
    }
}
