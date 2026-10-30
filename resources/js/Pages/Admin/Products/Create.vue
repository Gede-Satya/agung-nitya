<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface CategoryOption {
  id: number;
  short_title: string;
}

const props = defineProps<{
  categories: CategoryOption[];
}>();

const form = useForm({
  category_id: props.categories[0]?.id || '',
  name: '',
  brand: '',
  sku: '',
  price: 0,
  tkdn_percent: null as number | null,
  specs: '',
  image_url: '',
  inaproc_url: 'https://katalog.inaproc.id/agung-wijaya-nitya',
  order_num: 1,
  is_active: true,
});

function submit() {
  form.post(route('admin.products.store'));
}
</script>

<template>
  <AdminLayout>
    <Head title="Tambah Barang Baru" />

    <template #header>
      Tambah Barang Baru
    </template>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <Link 
          :href="route('admin.products.index')"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; Kembali ke Daftar Barang
        </Link>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form @submit.prevent="submit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Category Selection -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori Barang Inti *
              </label>
              <select 
                v-model="form.category_id"
                required
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.short_title }}
                </option>
              </select>
            </div>

            <!-- SKU / Code -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kode / SKU
              </label>
              <input 
                v-model="form.sku"
                type="text" 
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Contoh: CAM-SNY-Z200"
              />
            </div>
          </div>

          <!-- Product Name -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Barang / Tipe *
            </label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh: Sony PXW-Z200 4K HDR XDCAM Camcorder"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <!-- Brand -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Merek / Pabrikan
              </label>
              <input 
                v-model="form.brand"
                type="text" 
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Contoh: Sony / Dell / LG"
              />
            </div>

            <!-- Price -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Harga Resmi (Rp)
              </label>
              <input 
                v-model.number="form.price"
                type="number" 
                min="0"
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <!-- TKDN % -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nilai TKDN (%)
              </label>
              <input 
                v-model.number="form.tkdn_percent"
                type="number" 
                step="0.01"
                min="0"
                max="100"
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Contoh: 42.50"
              />
            </div>
          </div>

          <!-- Specs -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Spesifikasi Teknis
            </label>
            <textarea 
              v-model="form.specs"
              rows="3"
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh: Sensor 1.0-type stacked Exmor RS CMOS, 20x Optical Zoom, Auto Framing AI..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Image URL -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Path / URL Foto Barang
              </label>
              <input 
                v-model="form.image_url"
                type="text" 
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="/products/nama-foto.png"
              />
            </div>

            <!-- INAPROC LKPP URL -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tautan Etalase INAPROC LKPP
              </label>
              <input 
                v-model="form.inaproc_url"
                type="url" 
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Active Checkbox -->
          <div class="flex items-center gap-3">
            <input 
              v-model="form.is_active"
              id="prod_active" 
              type="checkbox" 
              class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label for="prod_active" class="text-sm font-medium text-slate-700 select-none">
              Tampilkan barang ini di etalase publik
            </label>
          </div>

          <!-- Buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link 
              :href="route('admin.products.index')"
              class="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Batal
            </Link>
            <button 
              type="submit" 
              :disabled="form.processing"
              class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors disabled:opacity-50"
            >
              Tambah Barang
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
