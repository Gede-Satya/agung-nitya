<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface CategoryOption {
  id: number;
  short_title: string;
}

interface ProductItem {
  id: number;
  name: string;
  brand: string | null;
  sku: string | null;
  price: number;
  tkdn_percent: number | null;
  image_url: string | null;
  category: {
    id: number;
    short_title: string;
  };
  is_active: boolean;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
}

const props = defineProps<{
  products: PaginatedData<ProductItem>;
  categories: CategoryOption[];
  selectedCategoryId: string | null;
}>();

const currentFilter = ref(props.selectedCategoryId || '');

function handleFilter() {
  router.get(route('admin.products.index'), {
    category_id: currentFilter.value || undefined,
  }, {
    preserveState: true,
  });
}

function formatPrice(val: number) {
  if (!val) return 'Rp -';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
}

function deleteProduct(id: number, name: string) {
  if (confirm(`Apakah Anda yakin ingin menghapus barang "${name}"?`)) {
    router.delete(route('admin.products.destroy', id));
  }
}
</script>

<template>
  <AdminLayout>
    <Head title="Kelola Daftar Barang & Spesifikasi" />

    <template #header>
      Daftar Barang & Tipe
    </template>

    <div class="space-y-6 max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Kelola Barang & Tipe</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Daftar jenis barang resmi terdaftar pada etalase INAPROC LKPP.
          </p>
        </div>

        <Link 
          :href="route('admin.products.create')"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Tambah Barang Baru
        </Link>
      </div>

      <!-- Filter Bar -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 justify-between">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <label class="text-xs font-semibold text-slate-600">Filter Kategori:</label>
          <select 
            v-model="currentFilter" 
            @change="handleFilter"
            class="text-xs rounded-lg border-slate-300 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Semua 16 Kategori</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.short_title }}
            </option>
          </select>
        </div>
        <div class="text-xs text-slate-500">
          Total: <strong class="text-slate-800">{{ products.total }}</strong> barang
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th scope="col" class="px-5 py-3.5">Nama Barang & SKU</th>
                <th scope="col" class="px-5 py-3.5">Kategori</th>
                <th scope="col" class="px-5 py-3.5">Merek</th>
                <th scope="col" class="px-5 py-3.5 text-right">Harga Resmi LKPP</th>
                <th scope="col" class="px-5 py-3.5 text-center">TKDN</th>
                <th scope="col" class="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="products.data.length === 0">
                <td colspan="6" class="p-8 text-center text-sm text-slate-400">
                  Tidak ada barang yang ditemukan.
                </td>
              </tr>
              <tr v-for="prod in products.data" :key="prod.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <img 
                      v-if="prod.image_url" 
                      :src="prod.image_url" 
                      alt="" 
                      class="w-10 h-10 object-contain rounded bg-slate-100 p-1 border border-slate-200"
                    />
                    <div>
                      <div class="font-bold text-slate-900 leading-snug">{{ prod.name }}</div>
                      <div class="text-xs font-mono text-slate-400 mt-0.5">SKU: {{ prod.sku || '-' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {{ prod.category.short_title }}
                  </span>
                </td>
                <td class="px-5 py-4 text-xs font-semibold text-slate-700">
                  {{ prod.brand || '-' }}
                </td>
                <td class="px-5 py-4 text-right font-mono font-bold text-slate-900">
                  {{ formatPrice(prod.price) }}
                </td>
                <td class="px-5 py-4 text-center">
                  <span v-if="prod.tkdn_percent" class="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold">
                    {{ prod.tkdn_percent }}%
                  </span>
                  <span v-else class="text-slate-400 text-xs">-</span>
                </td>
                <td class="px-5 py-4 text-right space-x-2">
                  <Link 
                    :href="route('admin.products.edit', prod.id)"
                    class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    @click="deleteProduct(prod.id, prod.name)"
                    type="button"
                    class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-xs font-semibold text-rose-600 transition-colors"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="products.last_page > 1" class="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link 
            v-if="products.prev_page_url" 
            :href="products.prev_page_url" 
            class="px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 font-medium"
          >
            &larr; Sebelumnya
          </Link>
          <span v-else class="text-slate-300">Halaman Pertama</span>

          <span class="text-slate-500">
            Halaman {{ products.current_page }} dari {{ products.last_page }}
          </span>

          <Link 
            v-if="products.next_page_url" 
            :href="products.next_page_url" 
            class="px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 font-medium"
          >
            Berikutnya &rarr;
          </Link>
          <span v-else class="text-slate-300">Halaman Terakhir</span>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
