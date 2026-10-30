<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalCategories' => Category::count(),
                'totalProducts' => Product::count(),
                'totalInquiries' => Inquiry::count(),
                'newInquiries' => Inquiry::where('status', 'new')->count(),
            ],
            'recentInquiries' => Inquiry::latest()->take(5)->get(),
            'recentProducts' => Product::with('category')->latest()->take(5)->get(),
        ]);
    }
}
