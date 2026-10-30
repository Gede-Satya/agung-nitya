<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface CategoryItem {
  id: number;
  order_label: string;
  short_title: string;
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  theme: string;
  products_count: number;
  is_active: boolean;
  order_num: number;
}

defineProps<{
  categories: CategoryItem[];
}>();
</script>

<template>
  <AdminLayout>
    <Head title="Kelola 16 Kategori Barang Inti" />

    <template #header>
      Kelola 16 Kategori Barang Inti
    </template>

    <div class="space-y-6 max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">16 Kategori Barang Inti</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Kategori ini tampil pada slider 3D interaktif dan halaman katalog detail publik.
          </p>
        </div>
      </div>

      <!-- Categories Table -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th scope="col" class="px-5 py-3.5 w-16 text-center">Urutan</th>
                <th scope="col" class="px-5 py-3.5">Kategori & Judul</th>
                <th scope="col" class="px-5 py-3.5">Tema Warna</th>
                <th scope="col" class="px-5 py-3.5 text-center">Jumlah Barang</th>
                <th scope="col" class="px-5 py-3.5 text-center">Status</th>
                <th scope="col" class="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="cat in categories" :key="cat.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="px-5 py-4 text-center">
                  <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 font-mono font-bold text-slate-800 text-xs">
                    {{ cat.order_label }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <img 
                      v-if="cat.cover_image" 
                      :src="cat.cover_image" 
                      alt="" 
                      class="w-10 h-10 object-contain rounded bg-slate-100 p-1 border border-slate-200"
                    />
                    <div>
                      <div class="font-bold text-slate-900">{{ cat.short_title }}</div>
                      <div class="text-xs text-slate-500 line-clamp-1">{{ cat.title }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-slate-100 text-slate-700">
                    {{ cat.theme }}
                  </span>
                </td>
                <td class="px-5 py-4 text-center">
                  <Link 
                    :href="route('admin.products.index', { category_id: cat.id })"
                    class="inline-block px-2.5 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    {{ cat.products_count }} Barang &rarr;
                  </Link>
                </td>
                <td class="px-5 py-4 text-center">
                  <span 
                    :class="[
                      'inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold',
                      cat.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    ]"
                  >
                    {{ cat.is_active ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </td>
                <td class="px-5 py-4 text-right">
                  <Link 
                    :href="route('admin.categories.edit', cat.id)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
