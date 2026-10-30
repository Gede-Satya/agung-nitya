<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface InquiryItem {
  id: number;
  name: string;
  agency_name: string | null;
  email: string;
  phone: string | null;
  service_needed: string | null;
  message: string;
  status: 'new' | 'read' | 'followed_up' | 'archived';
  created_at: string;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
}

defineProps<{
  inquiries: PaginatedData<InquiryItem>;
  currentStatus: string | null;
}>();

function updateStatus(id: number, newStatus: string) {
  router.patch(route('admin.inquiries.status', id), {
    status: newStatus,
  }, {
    preserveScroll: true,
  });
}

function deleteInquiry(id: number) {
  if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
    router.delete(route('admin.inquiries.destroy', id), {
      preserveScroll: true,
    });
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <AdminLayout>
    <Head title="Kotak Masuk Permintaan Klien" />

    <template #header>
      Pesan & Permintaan Pengadaan
    </template>

    <div class="space-y-6 max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Kotak Masuk Permintaan</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Pesan dan permohonan konsultasi pengadaan dari formulir kontak web publik.
          </p>
        </div>

        <!-- Filter Status Pills -->
        <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <Link 
            :href="route('admin.inquiries.index')"
            :class="[
              'px-3 py-1.5 rounded-lg transition-colors',
              !currentStatus ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Semua
          </Link>
          <Link 
            :href="route('admin.inquiries.index', { status: 'new' })"
            :class="[
              'px-3 py-1.5 rounded-lg transition-colors',
              currentStatus === 'new' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Baru
          </Link>
          <Link 
            :href="route('admin.inquiries.index', { status: 'followed_up' })"
            :class="[
              'px-3 py-1.5 rounded-lg transition-colors',
              currentStatus === 'followed_up' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            Ditindaklanjuti
          </Link>
        </div>
      </div>

      <!-- Inquiries List -->
      <div class="space-y-4">
        <div v-if="inquiries.data.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Tidak ada pesan dalam filter ini.
        </div>

        <div 
          v-for="item in inquiries.data" 
          :key="item.id"
          class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-slate-300 transition-colors"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                {{ item.name.charAt(0) }}
              </div>
              <div>
                <div class="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  {{ item.name }}
                  <span 
                    :class="[
                      'text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full',
                      item.status === 'new' ? 'bg-rose-100 text-rose-700' :
                      item.status === 'followed_up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    ]"
                  >
                    {{ item.status === 'new' ? 'Pesan Baru' : item.status === 'followed_up' ? 'Selesai' : 'Dibaca' }}
                  </span>
                </div>
                <div class="text-xs text-slate-500">
                  {{ item.agency_name || 'Instansi/Perusahaan Umum' }} · {{ item.email }} · {{ item.phone || 'No Telp: -' }}
                </div>
              </div>
            </div>

            <div class="text-xs text-slate-400">
              {{ formatDate(item.created_at) }}
            </div>
          </div>

          <!-- Message Body -->
          <div class="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            {{ item.message }}
          </div>

          <!-- Actions Footer -->
          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500">Ubah Status:</span>
              <button 
                v-if="item.status !== 'followed_up'"
                @click="updateStatus(item.id, 'followed_up')"
                type="button"
                class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold"
              >
                ✓ Tandai Sudah Dihubungi
              </button>
              <button 
                v-if="item.status === 'new'"
                @click="updateStatus(item.id, 'read')"
                type="button"
                class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Tandai Dibaca
              </button>
            </div>

            <button 
              @click="deleteInquiry(item.id)"
              type="button"
              class="text-xs font-semibold text-rose-600 hover:text-rose-800 p-1"
            >
              Hapus Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
