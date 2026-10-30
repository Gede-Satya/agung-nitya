<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface StatProps {
  totalCategories: number;
  totalProducts: number;
  totalInquiries: number;
  newInquiries: number;
}

interface InquiryItem {
  id: number;
  name: string;
  agency_name: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface ProductItem {
  id: number;
  name: string;
  brand: string | null;
  sku: string | null;
  category: {
    short_title: string;
  };
}

defineProps<{
  stats: StatProps;
  recentInquiries: InquiryItem[];
  recentProducts: ProductItem[];
}>();
</script>

<template>
  <AdminLayout>
    <Head title="Dashboard Admin" />

    <template #header>
      Ikhtisar Dashboard
    </template>

    <div class="space-y-6 max-w-7xl mx-auto">
      <!-- Welcome Header Card -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div class="relative z-10">
          <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">
            Panel Administrator Resmi
          </span>
          <h2 class="text-2xl font-bold tracking-tight">PT Agung Wijaya Nitya</h2>
          <p class="text-slate-300 text-sm mt-1 max-w-2xl">
            Kelola katalog 16 barang inti, perbarui spesifikasi teknis etalase INAPROC LKPP, dan pantau permintaan pengadaan langsung dari satu tempat.
          </p>
        </div>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: 16 Categories -->
        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wider">Kategori Inti</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalCategories }} Kategori</div>
            <Link :href="route('admin.categories.index')" class="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Kelola kategori &rarr;
            </Link>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
        </div>

        <!-- Card 2: Total Products -->
        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Barang & Tipe</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalProducts }} Produk</div>
            <Link :href="route('admin.products.index')" class="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Lihat seluruh barang &rarr;
            </Link>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
        </div>

        <!-- Card 3: Total Inquiries -->
        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Permintaan</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">{{ stats.totalInquiries }} Pesan</div>
            <Link :href="route('admin.inquiries.index')" class="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Buka kotak masuk &rarr;
            </Link>
          </div>
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          </div>
        </div>

        <!-- Card 4: New / Unread Inquiries -->
        <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wider">Perlu Tindak Lanjut</div>
            <div class="text-2xl font-bold text-rose-600 mt-1">{{ stats.newInquiries }} Baru</div>
            <Link :href="route('admin.inquiries.index', { status: 'new' })" class="text-xs font-medium text-rose-600 hover:text-rose-700 mt-2 inline-block">
              Filter pesan baru &rarr;
            </Link>
          </div>
          <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
      </div>

      <!-- Two-Column Recent Activity Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Inquiries -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-sm">Permintaan Masuk Terbaru</h3>
            <Link :href="route('admin.inquiries.index')" class="text-xs text-blue-600 hover:underline">Semua &rarr;</Link>
          </div>
          <div class="divide-y divide-slate-100">
            <div v-if="recentInquiries.length === 0" class="p-6 text-center text-sm text-slate-400">
              Belum ada pesan masuk.
            </div>
            <div v-for="inq in recentInquiries" :key="inq.id" class="p-4 hover:bg-slate-50 transition-colors">
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-semibold text-slate-900 text-sm">{{ inq.name }}</div>
                  <div class="text-xs text-slate-500">{{ inq.agency_name || inq.email }}</div>
                </div>
                <span 
                  :class="[
                    'text-[11px] font-semibold px-2 py-0.5 rounded-full',
                    inq.status === 'new' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  {{ inq.status === 'new' ? 'Baru' : 'Selesai' }}
                </span>
              </div>
              <p class="text-xs text-slate-600 mt-1 line-clamp-2">{{ inq.message }}</p>
            </div>
          </div>
        </div>

        <!-- Recent Products -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-sm">Daftar Barang Terbaru</h3>
            <Link :href="route('admin.products.create')" class="text-xs font-semibold text-blue-600 hover:underline">+ Tambah Barang</Link>
          </div>
          <div class="divide-y divide-slate-100">
            <div v-if="recentProducts.length === 0" class="p-6 text-center text-sm text-slate-400">
              Belum ada produk.
            </div>
            <div v-for="prod in recentProducts" :key="prod.id" class="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div>
                <div class="font-semibold text-slate-900 text-sm">{{ prod.name }}</div>
                <div class="text-xs text-slate-500">
                  <span class="inline-block px-1.5 py-0.5 bg-slate-100 rounded text-[11px] text-slate-600 mr-2">{{ prod.category.short_title }}</span>
                  <span v-if="prod.brand">{{ prod.brand }}</span>
                </div>
              </div>
              <Link :href="route('admin.products.edit', prod.id)" class="text-xs text-slate-500 hover:text-blue-600 p-1">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
