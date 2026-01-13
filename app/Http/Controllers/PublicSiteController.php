<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Fortify\Features;

class PublicSiteController extends Controller
{
    public function index()
    {
        return inertia('public/home', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    // public function services()
    // {
    //     return inertia('public/services');
    // }

    // public function contact()
    // {
    //     return inertia('public/contact');
    // }
}
