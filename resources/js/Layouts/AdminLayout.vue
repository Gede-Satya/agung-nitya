<script setup lang="ts">
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const showingSidebar = ref(false);
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans antialiased">
    <!-- Mobile Header -->
    <header class="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
          AN
        </div>
        <span class="font-bold text-sm tracking-wide">Admin Agung Nitya</span>
      </div>
      <button 
        @click="showingSidebar = !showingSidebar"
        class="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800"
        aria-label="Toggle Navigation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </header>

    <!-- Sidebar Navigation -->
    <aside 
      :class="[
        'fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0',
        showingSidebar ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      ]"
    >
      <!-- Brand Logo -->
      <div class="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link :href="route('admin.dashboard')" class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-inner">
            AN
          </div>
          <div>
            <div class="font-bold text-sm text-white leading-tight">Agung Wijaya Nitya</div>
            <div class="text-[11px] text-slate-400 font-medium">Katalog & CMS Admin</div>
          </div>
        </Link>
        <button @click="showingSidebar = false" class="md:hidden text-slate-400 hover:text-white">✕</button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <Link 
          :href="route('admin.dashboard')"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            route().current('admin.dashboard') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </Link>

        <Link 
          :href="route('admin.categories.index')"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            route().current('admin.categories.*') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          16 Kategori Barang
        </Link>

        <Link 
          :href="route('admin.products.index')"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            route().current('admin.products.*') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Daftar Barang & Tipe
        </Link>

        <Link 
          :href="route('admin.inquiries.index')"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            route().current('admin.inquiries.*') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          Pesan & Permintaan
        </Link>

        <div class="pt-4 mt-4 border-t border-slate-800">
          <a 
            href="/" 
            target="_blank"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-400 hover:bg-slate-800"
          >
            <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            Lihat Web Publik ↗
          </a>
        </div>
      </nav>

      <!-- User Profile & Logout -->
      <div class="p-3 border-t border-slate-800 bg-slate-950/40">
        <div class="flex items-center justify-between px-2 py-1.5">
          <div class="truncate mr-2">
            <div class="text-xs font-semibold text-white truncate">{{ page.props.auth.user.name }}</div>
            <div class="text-[11px] text-slate-400 truncate">{{ page.props.auth.user.email }}</div>
          </div>
          <Link 
            :href="route('logout')" 
            method="post" 
            as="button"
            class="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Keluar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </Link>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <div class="bg-white border-b border-slate-200 px-6 py-3.5 hidden md:flex items-center justify-between">
        <h1 class="text-base font-semibold text-slate-800">
          <slot name="header">Panel Administrator</slot>
        </h1>
        <div class="flex items-center gap-4 text-xs text-slate-500">
          <span>Status Sistem: <strong class="text-emerald-600 font-medium">Online (Laravel + Vue)</strong></span>
        </div>
      </div>

      <!-- Flash Notification Message -->
      <div v-if="(page.props as any).flash?.success" class="mx-6 mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span>{{ (page.props as any).flash.success }}</span>
        </div>
      </div>

      <!-- Main Slot Content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
