<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $categoryId = $request->query('category_id');

        $query = Product::with('category')->latest();

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $products = $query->paginate(15)->withQueryString();
        $categories = Category::orderBy('order_num', 'asc')->get(['id', 'short_title']);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategoryId' => $categoryId,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::orderBy('order_num', 'asc')->get(['id', 'short_title']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:100'],
            'sku' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'tkdn_percent' => ['nullable', 'numeric', 'between:0,100'],
            'specs' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'inaproc_url' => ['nullable', 'url'],
            'order_num' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function edit(Product $product): Response
    {
        $categories = Category::orderBy('order_num', 'asc')->get(['id', 'short_title']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:100'],
            'sku' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'tkdn_percent' => ['nullable', 'numeric', 'between:0,100'],
            'specs' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'inaproc_url' => ['nullable', 'url'],
            'order_num' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Barang berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Barang berhasil dihapus.');
    }
}
