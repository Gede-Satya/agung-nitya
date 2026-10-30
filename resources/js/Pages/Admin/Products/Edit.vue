<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface CategoryOption {
  id: number;
  short_title: string;
}

interface ProductData {
  id: number;
  category_id: number;
  name: string;
  brand: string | null;
  sku: string | null;
  price: number;
  tkdn_percent: number | null;
  specs: string | null;
  image_url: string | null;
  inaproc_url: string | null;
  order_num: number;
  is_active: boolean;
}

const props = defineProps<{
  product: ProductData;
  categories: CategoryOption[];
}>();

const form = useForm({
  category_id: props.product.category_id,
  name: props.product.name,
  brand: props.product.brand || '',
  sku: props.product.sku || '',
  price: props.product.price,
  tkdn_percent: props.product.tkdn_percent,
  specs: props.product.specs || '',
  image_url: props.product.image_url || '',
  inaproc_url: props.product.inaproc_url || '',
  order_num: props.product.order_num,
  is_active: props.product.is_active,
});

function submit() {
  form.put(route('admin.products.update', props.product.id));
}
</script>

<template>
  <AdminLayout>
    <Head :title="`Edit Barang - ${product.name}`" />

    <template #header>
      Edit Barang: {{ product.name }}
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
              id="edit_prod_active" 
              type="checkbox" 
              class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label for="edit_prod_active" class="text-sm font-medium text-slate-700 select-none">
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
