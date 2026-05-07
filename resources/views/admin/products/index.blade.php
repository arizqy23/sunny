<div class="space-y-5">

    {{-- Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <h2 class="text-2xl font-bold text-slate-900">Manajemen Produk</h2>
            <p class="text-slate-500 text-sm mt-0.5">Kelola semua varian produk Sunny</p>
        </div>
        <a href="{{ route('admin.products.create') }}" wire:navigate
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 font-bold text-sm rounded-xl shadow-sm hover:shadow-lime-500/30 hover:-translate-y-0.5 transition-all duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Produk
        </a>
    </div>

    {{-- Filters --}}
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input wire:model.live.debounce.350ms="search" type="text"
                    placeholder="Cari produk..."
                    class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
            </div>
            <select wire:model.live="status"
                class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 bg-white">
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
            </select>
        </div>
    </div>

    {{-- Table --}}
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-slate-100 bg-slate-50/50">
                        <th class="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Produk</th>
                        <th class="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-900" wire:click="sort('price_min')">
                            <div class="flex items-center gap-1">Harga <span class="text-slate-300">↕</span></div>
                        </th>
                        <th class="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer" wire:click="sort('sort_order')">
                            <div class="flex items-center gap-1">Urutan <span class="text-slate-300">↕</span></div>
                        </th>
                        <th class="text-center px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Featured</th>
                        <th class="text-center px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th class="text-right px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                    @forelse($products as $product)
                    <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-lime-100 to-green-100">
                                    @if($product->image_path)
                                        <img src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($product->image_path) }}"
                                            alt="{{ $product->name }}"
                                            class="w-full h-full object-cover">
                                    @else
                                        <div class="w-full h-full flex items-center justify-center text-2xl">
                                            {{ $product->emoji ?? '🧴' }}
                                        </div>
                                    @endif
                                </div>
                                <div>
                                    <p class="font-bold text-slate-900 text-sm">{{ $product->name }}</p>
                                    <p class="text-slate-400 text-xs mt-0.5">{{ $product->tagline }}</p>
                                    <p class="text-slate-300 text-[11px] mt-0.5 font-mono">/produk/{{ $product->slug }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-4">
                            <p class="text-slate-900 text-sm font-semibold">
                                @if($product->price_min)
                                    Rp {{ number_format($product->price_min, 0, ',', '.') }}
                                    @if($product->price_max)
                                    <span class="text-slate-400 font-normal">– {{ number_format($product->price_max, 0, ',', '.') }}</span>
                                    @endif
                                @else
                                    <span class="text-slate-300">—</span>
                                @endif
                            </p>
                        </td>
                        <td class="px-4 py-4">
                            <span class="text-slate-600 text-sm font-semibold">#{{ $product->sort_order }}</span>
                        </td>
                        <td class="px-4 py-4 text-center">
                            @if($product->is_featured)
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-sunny-100 text-yellow-700 rounded-full text-[11px] font-bold">
                                ⭐ Unggulan
                            </span>
                            @else
                            <span class="text-slate-300 text-xs">—</span>
                            @endif
                        </td>
                        <td class="px-4 py-4 text-center">
                            <button wire:click="toggleActive({{ $product->id }})"
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200
                                    {{ $product->is_active
                                        ? 'bg-lime-100 text-lime-700 hover:bg-lime-200'
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200' }}">
                                <span class="w-1.5 h-1.5 rounded-full {{ $product->is_active ? 'bg-lime-500' : 'bg-slate-400' }}"></span>
                                {{ $product->is_active ? 'Aktif' : 'Nonaktif' }}
                            </button>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.products.edit', $product->id) }}" wire:navigate
                                    class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </a>
                                <button wire:click="confirmDelete({{ $product->id }})"
                                    class="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-6 py-16 text-center">
                            <div class="text-4xl mb-3">🧴</div>
                            <p class="text-slate-500 font-medium">Tidak ada produk ditemukan</p>
                            <p class="text-slate-400 text-sm mt-1">Coba ubah filter atau tambah produk baru</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if($products->hasPages())
        <div class="px-6 py-4 border-t border-slate-100">
            {{ $products->links('admin.components.pagination') }}
        </div>
        @endif
    </div>

    {{-- Confirm Delete Modal --}}
    {{-- DIPERBAIKI: $confirmDelete → $showDeleteModal --}}
    @if($showDeleteModal)
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" wire:click="cancelDelete"></div>
        <div class="relative bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full">
            <div class="text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🗑️</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2">Hapus Produk?</h3>
                <p class="text-slate-500 text-sm mb-6">Tindakan ini tidak dapat dibatalkan. Produk akan dihapus permanen.</p>
                <div class="flex gap-3">
                    <button wire:click="cancelDelete"
                        class="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button wire:click="deleteProduct"
                        class="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-colors">
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    </div>
    @endif

</div>
