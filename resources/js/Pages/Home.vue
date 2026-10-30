<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import Slider3D, { CategoryItem } from '@/Components/Slider3D.vue';

const props = defineProps<{
  categories: CategoryItem[];
}>();

const selectedCategory = ref<CategoryItem | null>(null);

function openCategoryModal(cat: CategoryItem) {
  selectedCategory.value = cat;
}

function closeCategoryModal() {
  selectedCategory.value = null;
}

// Inquiry Form
const inquiryForm = useForm({
  name: '',
  agency_name: '',
  email: '',
  phone: '',
  service_needed: 'Pengadaan Perangkat Keras LKPP',
  message: '',
});

function sendInquiry() {
  inquiryForm.post(route('inquiry.store'), {
    preserveScroll: true,
    onSuccess: () => {
      inquiryForm.reset();
    },
  });
}

function formatPrice(val: number) {
  if (!val) return 'Hubungi Kami';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
}
</script>

<template>
  <div class="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
    <Head title="PT Agung Wijaya Nitya - Penyedia Resmi Katalog Elektronik LKPP" />

    <!-- Top Announcement Bar -->
    <div class="bg-slate-900 text-slate-300 px-4 py-2 text-xs font-medium text-center border-b border-slate-800 flex items-center justify-center gap-2">
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>Penyedia Resmi Terverifikasi INAPROC LKPP Republik Indonesia</span>
      <span class="hidden sm:inline text-slate-500">·</span>
      <a href="https://katalog.inaproc.id/agung-wijaya-nitya" target="_blank" rel="noopener" class="text-blue-400 hover:underline hidden sm:inline">
        Buka Etalase INAPROC &rarr;
      </a>
    </div>

    <!-- Navigation Bar -->
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Brand Logo -->
        <a href="#hero" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-700 text-white font-black flex items-center justify-center text-lg shadow-sm">
            AN
          </div>
          <div>
            <div class="font-extrabold text-base tracking-tight text-slate-900">Agung Wijaya Nitya</div>
            <div class="text-[11px] text-slate-500 font-medium">Mitra Pengadaan Pemerintah & B2B</div>
          </div>
        </a>

        <!-- Menu Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a href="#katalog" class="hover:text-blue-600 transition-colors">16 Kategori Barang</a>
          <a href="#keunggulan" class="hover:text-blue-600 transition-colors">Keunggulan & TKDN</a>
          <a href="#kontak" class="hover:text-blue-600 transition-colors">Hubungi Kami</a>
        </nav>

        <!-- CTA & Admin Link -->
        <div class="flex items-center gap-3">
          <Link 
            v-if="$page.props.auth?.user"
            :href="route('admin.dashboard')" 
            class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Dashboard Admin
          </Link>
          <Link 
            v-else
            :href="route('login')" 
            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          >
            Login Admin
          </Link>

          <a 
            href="#kontak"
            class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            Konsultasi Pengadaan
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          Katalog Elektronik INAPROC LKPP Resmi
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Penyedia Solusi Teknologi &amp; Fasilitas Resmi Pemerintahan.
        </h1>

        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          PT Agung Wijaya Nitya menghadirkan 16 kategori barang inti terlengkap dengan jaminan keaslian prinsipal, sertifikasi TKDN resmi, dan kemudahan transaksi melalui e-Katalog LKPP.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a 
            href="#katalog" 
            class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            Jelajahi 16 Kategori Barang &rarr;
          </a>
          <a 
            href="https://katalog.inaproc.id/agung-wijaya-nitya" 
            target="_blank" 
            rel="noopener"
            class="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
          >
            Buka INAPROC LKPP ↗
          </a>
        </div>
      </div>
    </section>

    <!-- 3D Slider Section (Dynamically powered by Laravel Database) -->
    <section id="katalog" class="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">
            KATALOG RESMI LKPP · 16 KATEGORI BARANG INTI
          </span>
          <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Katalog Barang Inti &amp; Jenis-Jenisnya.
          </h2>
          <p class="text-sm sm:text-base text-slate-600">
            16 kategori barang inti resmi terdaftar pada etalase INAPROC LKPP. Klik kartu mana saja (misalnya Kamera, Server, atau UPS) untuk langsung membuka spesifikasi teknis beserta seluruh jenis dan tipenya.
          </p>
        </div>

        <!-- The 3D Slider Component -->
        <Slider3D 
          :categories="categories" 
          @select-category="openCategoryModal" 
        />
      </div>
    </section>

    <!-- Category Detail Modal / Popup -->
    <div 
      v-if="selectedCategory" 
      class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded bg-blue-600 font-mono font-bold text-xs">
              {{ selectedCategory.order_label }}
            </span>
            <div>
              <h3 class="font-bold text-base sm:text-lg leading-tight">{{ selectedCategory.title }}</h3>
              <p class="text-xs text-slate-400">{{ selectedCategory.short_title }}</p>
            </div>
          </div>
          <button 
            @click="closeCategoryModal" 
            class="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-lg font-bold"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-6 overflow-y-auto space-y-6">
          <!-- Description & Sub-types -->
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
            <p class="text-sm text-slate-700 leading-relaxed">
              {{ selectedCategory.description }}
            </p>

            <div v-if="selectedCategory.sub_types_summary?.length" class="pt-2">
              <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Jenis &amp; Sub-Tipe yang Tersedia:
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(sub, i) in selectedCategory.sub_types_summary" 
                  :key="i"
                  class="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  {{ sub }}
                </span>
              </div>
            </div>
          </div>

          <!-- Products Listing -->
          <div>
            <h4 class="font-bold text-base text-slate-900 mb-4">
              Daftar Barang Resmi Terdaftar ({{ selectedCategory.products?.length || 0 }} Item)
            </h4>

            <div v-if="!selectedCategory.products || selectedCategory.products.length === 0" class="text-center py-8 text-slate-400 text-sm bg-slate-50 rounded-xl">
              Data tipe barang sedang dimutakhirkan. Silakan hubungi admin atau periksa etalase resmi INAPROC.
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="prod in selectedCategory.products" 
                :key="prod.id"
                class="p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors flex flex-col justify-between bg-white shadow-sm"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <span v-if="prod.brand" class="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {{ prod.brand }}
                    </span>
                    <span v-if="prod.tkdn_percent" class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      TKDN {{ prod.tkdn_percent }}%
                    </span>
                  </div>
                  <h5 class="font-bold text-slate-900 text-sm mt-1 leading-snug">{{ prod.name }}</h5>
                  <p v-if="prod.specs" class="text-xs text-slate-500 mt-2 line-clamp-3">{{ prod.specs }}</p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div class="text-sm font-bold font-mono text-slate-900">
                    {{ formatPrice(prod.price) }}
                  </div>
                  <a 
                    :href="prod.inaproc_url || 'https://katalog.inaproc.id/agung-wijaya-nitya'" 
                    target="_blank" 
                    rel="noopener"
                    class="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Beli di LKPP ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span class="text-xs text-slate-500">PT Agung Wijaya Nitya · LKPP e-Katalog</span>
          <button 
            @click="closeCategoryModal" 
            class="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            Tutup Katalog
          </button>
        </div>
      </div>
    </div>

    <!-- Contact & Inquiry Form Section -->
    <section id="kontak" class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center space-y-3 mb-10">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Layanan Konsultasi & Pengadaan</span>
          <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ajukan Permintaan Pengadaan Resmi
          </h2>
          <p class="text-sm text-slate-600">
            Kirimkan rincian kebutuhan instansi Anda. Tim spesialis pengadaan kami akan segera memberikan penawaran resmi beserta kelengkapan administrasi.
          </p>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <form @submit.prevent="sendInquiry" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input 
                  v-model="inquiryForm.name"
                  type="text" 
                  required
                  placeholder="Nama Penanggung Jawab"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Instansi / Perusahaan *
                </label>
                <input 
                  v-model="inquiryForm.agency_name"
                  type="text" 
                  required
                  placeholder="Nama Dinas / Lembaga / PT"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Kantor *
                </label>
                <input 
                  v-model="inquiryForm.email"
                  type="email" 
                  required
                  placeholder="nama@instansi.go.id"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp / Telepon *
                </label>
                <input 
                  v-model="inquiryForm.phone"
                  type="tel" 
                  required
                  placeholder="0812xxxxxxxx"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Rincian Kebutuhan &amp; Spesifikasi Barang *
              </label>
              <textarea 
                v-model="inquiryForm.message"
                rows="4" 
                required
                placeholder="Tuliskan estimasi jumlah unit, kategori barang yang dicari, atau jadwal pengadaan..."
                class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="inquiryForm.processing"
              class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
            >
              Kirim Permintaan Pengadaan
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div class="font-bold text-white text-sm">PT Agung Wijaya Nitya</div>
          <p class="mt-1">Penyedia Katalog Elektronik INAPROC Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah (LKPP)</p>
        </div>
        <div class="text-slate-500">
          &copy; {{ new Date().getFullYear() }} PT Agung Wijaya Nitya. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  </div>
</template>
