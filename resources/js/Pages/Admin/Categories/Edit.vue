<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface CategoryData {
  id: number;
  slug: string;
  order_label: string;
  order_num: number;
  short_title: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  theme: string;
  cover_image: string | null;
  sub_types_summary: string[] | null;
  is_active: boolean;
}

const props = defineProps<{
  category: CategoryData;
}>();

const form = useForm({
  short_title: props.category.short_title,
  title: props.category.title,
  subtitle: props.category.subtitle || '',
  description: props.category.description || '',
  theme: props.category.theme,
  cover_image: props.category.cover_image || '',
  order_num: props.category.order_num,
  is_active: props.category.is_active,
  sub_types_text: (props.category.sub_types_summary || []).join('\n'),
});

function submit() {
  const summaryArray = form.sub_types_text
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  form.transform(() => ({
    short_title: form.short_title,
    title: form.title,
    subtitle: form.subtitle,
    description: form.description,
    theme: form.theme,
    cover_image: form.cover_image,
    order_num: form.order_num,
    is_active: form.is_active,
    sub_types_summary: summaryArray,
  })).put(route('admin.categories.update', props.category.id));
}
</script>

<template>
  <AdminLayout>
    <Head :title="`Edit Kategori - ${category.short_title}`" />

    <template #header>
      Edit Kategori: {{ category.short_title }}
    </template>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <Link 
          :href="route('admin.categories.index')"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; Kembali ke Daftar Kategori
        </Link>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form @submit.prevent="submit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Short Title -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Singkat (Pill / Label 3D) *
              </label>
              <input 
                v-model="form.short_title"
                type="text" 
                required
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Order Num -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomor Urutan (1 - 16) *
              </label>
              <input 
                v-model.number="form.order_num"
                type="number" 
                min="1" 
                max="99" 
                required
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Full Title -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Lengkap Kategori *
            </label>
            <input 
              v-model="form.title"
              type="text" 
              required
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Subtitle -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subjudul / Ringkasan Singkat
            </label>
            <input 
              v-model="form.subtitle"
              type="text" 
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi Lengkap
            </label>
            <textarea 
              v-model="form.description"
              rows="3"
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Theme Color -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tema Warna *
              </label>
              <select 
                v-model="form.theme"
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="crimson">Crimson (Merah Marun)</option>
                <option value="navy">Navy (Biru Gelap)</option>
                <option value="gold">Gold (Emas / Kuning)</option>
                <option value="charcoal">Charcoal (Hitam Abu)</option>
                <option value="bronze">Bronze (Cokelat Tembaga)</option>
                <option value="slate">Slate (Abu Kebiruan)</option>
              </select>
            </div>

            <!-- Cover Image Path -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                URL / Path Gambar Kartu
              </label>
              <input 
                v-model="form.cover_image"
                type="text" 
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="/products/nama-file.png"
              />
            </div>
          </div>

          <!-- Subtypes Summary (One per line) -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Daftar Jenis-Jenis Barang (Tulis 1 per baris)
            </label>
            <textarea 
              v-model="form.sub_types_text"
              rows="5"
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh:&#10;Camcorder Profesional 4K&#10;Kamera Mirrorless & DSLR&#10;Kamera Konferensi Video"
            ></textarea>
            <p class="text-[11px] text-slate-400 mt-1">Setiap baris akan ditampilkan sebagai badge/tag jenis barang pada kartu dan detail katalog.</p>
          </div>

          <!-- Active Checkbox -->
          <div class="flex items-center gap-3">
            <input 
              v-model="form.is_active"
              id="is_active" 
              type="checkbox" 
              class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label for="is_active" class="text-sm font-medium text-slate-700 select-none">
              Tampilkan kategori ini pada etalase dan slider 3D
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link 
              :href="route('admin.categories.index')"
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
