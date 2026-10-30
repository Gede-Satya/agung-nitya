<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with(['products' => function ($query) {
            $query->where('is_active', true)->orderBy('order_num', 'asc');
        }])
        ->where('is_active', true)
        ->orderBy('order_num', 'asc')
        ->get();

        return Inertia::render('Home', [
            'categories' => $categories,
        ]);
    }
}
