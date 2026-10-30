<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::withCount('products')
            ->orderBy('order_num', 'asc')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'short_title' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:150'],
            'subtitle' => ['nullable', 'string', 'max:250'],
            'description' => ['nullable', 'string'],
            'theme' => ['required', 'string', 'max:50'],
            'cover_image' => ['nullable', 'string'],
            'sub_types_summary' => ['nullable', 'array'],
            'order_num' => ['required', 'integer'],
            'is_active' => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['short_title']);
        $validated['order_label'] = str_pad((string) $validated['order_num'], 2, '0', STR_PAD_LEFT);

        Category::create($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'short_title' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:150'],
            'subtitle' => ['nullable', 'string', 'max:250'],
            'description' => ['nullable', 'string'],
            'theme' => ['required', 'string', 'max:50'],
            'cover_image' => ['nullable', 'string'],
            'sub_types_summary' => ['nullable', 'array'],
            'order_num' => ['required', 'integer'],
            'is_active' => ['boolean'],
        ]);

        $validated['order_label'] = str_pad((string) $validated['order_num'], 2, '0', STR_PAD_LEFT);

        $category->update($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
