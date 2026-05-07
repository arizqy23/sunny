<div class="space-y-5 max-w-4xl">

    {{-- Header --}}
    <div class="flex items-center gap-3">
        <a href="{{ route('admin.products.index') }}" wire:navigate
            class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </a>
        <div>
            <h2 class="text-2xl font-bold text-slate-900">{{ $productId ? 'Edit Produk' : 'Tambah Produk' }}</h2>
            <p class="text-slate-500 text-sm mt-0.5">{{ $productId ? 'Perbarui informasi produk' : 'Tambah varian baru ke katalog Sunny' }}</p>
        </div>
    </div>

    <form wire:submit="save" class="space-y-5">

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {{-- LEFT: Main Info --}}
            <div class="lg:col-span-2 space-y-4">

                {{-- Basic Info --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">📋 Informasi Dasar</h3>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Nama Produk *</label>
                            <input wire:model.live="name" type="text" placeholder="Sunny Jeruk Nipis"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all @error('name') border-red-400 bg-red-50 @enderror">
                            @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                        </div>

                        <div class="col-span-2 sm:col-span-1">
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Slug URL *</label>
                            <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-lime-500/30 focus-within:border-lime-500 @error('slug') border-red-400 @enderror">
                                <span class="px-3 py-2.5 bg-slate-50 text-slate-400 text-xs font-mono border-r border-slate-200">/produk/</span>
                                <input wire:model="slug" type="text"
                                    class="flex-1 px-3 py-2.5 text-sm font-mono focus:outline-none bg-white">
                            </div>
                            @error('slug') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                        </div>

                        <div class="col-span-2 sm:col-span-1">
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Emoji</label>
                            <input wire:model="emoji" type="text" placeholder="🧴" maxlength="5"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-2xl focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all text-center">
                        </div>

                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Tagline</label>
                            <input wire:model="tagline" type="text" placeholder="Kesegaran Citrus Alami" maxlength="150"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>

                        <div class="col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi</label>
                            <textarea wire:model="description" rows="4" placeholder="Deskripsi produk yang menarik dan informatif..."
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all resize-none"></textarea>
                        </div>
                    </div>
                </div>

                {{-- ★ FOTO PRODUK ★ --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">🖼️ Foto Produk
                        <span class="text-slate-400 font-normal text-xs ml-1">JPG / PNG / WEBP · maks 2MB</span>
                    </h3>

                    <div class="flex flex-col sm:flex-row gap-5 items-start">

                        {{-- Thumbnail preview --}}
                        <div class="flex-shrink-0">
                            @if ($image)
                                {{-- Preview foto baru --}}
                                <div class="relative">
                                    <img src="{{ $image->temporaryUrl() }}"
                                        class="w-40 h-40 object-cover rounded-2xl border-2 border-lime-400 shadow-md">
                                    <button type="button" wire:click="removeNewImage"
                                        class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                    <span class="absolute bottom-2 left-2 bg-lime-500 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">Baru</span>
                                </div>
                            @elseif ($existing_image)
                                {{-- Preview foto lama --}}
                                <div class="relative">
                                    <img src="{{ Storage::disk('public')->url($existing_image) }}"
                                        class="w-40 h-40 object-cover rounded-2xl border border-slate-200 shadow-sm">
                                    <button type="button" wire:click="removeExistingImage"
                                        wire:confirm="Hapus foto ini secara permanen?"
                                        class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                    <span class="absolute bottom-2 left-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">Tersimpan</span>
                                </div>
                            @else
                                {{-- Placeholder kosong --}}
                                <div class="w-40 h-40 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
                                    <span class="text-4xl opacity-40">🧴</span>
                                </div>
                            @endif
                        </div>

                        {{-- Upload area --}}
                        <div class="flex-1 w-full">
                            <label for="image-upload"
                                class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-lime-400 hover:bg-lime-50/50 transition-all group">
                                <div class="flex flex-col items-center gap-2 text-slate-400 group-hover:text-lime-600 transition-colors">
                                    <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <div class="text-center">
                                        <p class="text-sm font-semibold">
                                            {{ ($existing_image || $image) ? 'Ganti dengan foto baru' : 'Upload foto produk' }}
                                        </p>
                                        <p class="text-xs mt-0.5">Klik atau drag & drop · JPG, PNG, WEBP</p>
                                        <p class="text-xs text-slate-300 mt-0.5">Maksimal 2MB</p>
                                    </div>
                                </div>
                                <input id="image-upload" type="file" wire:model="image"
                                    accept="image/jpeg,image/png,image/webp" class="hidden">
                            </label>

                            {{-- Loading --}}
                            <div wire:loading wire:target="image"
                                class="flex items-center gap-2 mt-2 text-lime-600 text-xs font-medium">
                                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Memproses foto...
                            </div>

                            @error('image')
                                <p class="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                    {{ $message }}
                                </p>
                            @enderror
                        </div>
                    </div>
                </div>

                {{-- Pricing --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">💰 Harga</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Harga Minimum (Rp)</label>
                            <input wire:model="price_min" type="number" placeholder="12500"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Harga Maksimum (Rp)</label>
                            <input wire:model="price_max" type="number" placeholder="38000"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>
                    </div>
                </div>

                {{-- Sizes & Benefits --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">📦 Ukuran & Manfaat</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                                Ukuran
                                <span class="text-slate-400 font-normal text-xs ml-1">(satu per baris)</span>
                            </label>
                            <textarea wire:model="sizes_raw" rows="4" placeholder="250ml&#10;500ml&#10;800ml&#10;1 Liter"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all resize-none font-mono"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                                Manfaat
                                <span class="text-slate-400 font-normal text-xs ml-1">(satu per baris)</span>
                            </label>
                            <textarea wire:model="benefits_raw" rows="4" placeholder="Memotong lemak 3x lebih cepat&#10;Aroma tahan lama&#10;Kulit tetap lembut"
                                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all resize-none"></textarea>
                        </div>
                    </div>
                </div>

                {{-- Color Config --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">🎨 Konfigurasi Warna <span class="text-slate-400 font-normal text-xs ml-1">(Tailwind classes)</span></h3>
                    <div class="grid grid-cols-2 gap-3">
                        @foreach([
                            ['key' => 'color_bg',    'label' => 'Background'],
                            ['key' => 'color_badge', 'label' => 'Badge'],
                            ['key' => 'color_card',  'label' => 'Card Gradient'],
                            ['key' => 'color_accent','label' => 'Accent Text'],
                            ['key' => 'color_btn',   'label' => 'Button'],
                            ['key' => 'color_ring',  'label' => 'Ring'],
                        ] as $field)
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">{{ $field['label'] }}</label>
                            <input wire:model="{{ $field['key'] }}" type="text"
                                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>

            {{-- RIGHT: Settings --}}
            <div class="space-y-4">
                {{-- Publish Settings --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">⚙️ Pengaturan</h3>

                    <label class="flex items-center justify-between gap-3 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-slate-700">Status Aktif</p>
                            <p class="text-xs text-slate-400">Tampilkan di website</p>
                        </div>
                        <div class="relative">
                            <input wire:model="is_active" type="checkbox" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-checked:bg-lime-500 rounded-full transition-colors"></div>
                            <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>

                    <label class="flex items-center justify-between gap-3 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-slate-700">Produk Unggulan</p>
                            <p class="text-xs text-slate-400">Tampil di homepage</p>
                        </div>
                        <div class="relative">
                            <input wire:model="is_featured" type="checkbox" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-checked:bg-yellow-400 rounded-full transition-colors"></div>
                            <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil</label>
                        <input wire:model="sort_order" type="number" min="0"
                            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                    </div>
                </div>

                {{-- Preview Card --}}
                <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-white/[0.06]">
                    <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Preview Produk</p>
                    <div class="bg-white/5 rounded-xl p-4 text-center">
                        @if ($image)
                            <img src="{{ $image->temporaryUrl() }}"
                                class="w-20 h-20 object-cover rounded-2xl mx-auto mb-2 border-2 border-lime-400">
                        @elseif ($existing_image)
                            <img src="{{ Storage::disk('public')->url($existing_image) }}"
                                class="w-20 h-20 object-cover rounded-2xl mx-auto mb-2 border border-white/20">
                        @else
                            <div class="text-5xl mb-2">{{ $emoji ?: '🧴' }}</div>
                        @endif
                        <p class="text-white font-bold text-sm">{{ $name ?: 'Nama Produk' }}</p>
                        <p class="text-gray-500 text-xs mt-0.5">{{ $tagline ?: 'Tagline produk' }}</p>
                        @if($price_min)
                            <p class="text-lime-400 text-xs mt-2 font-semibold">
                                Rp {{ number_format((float)$price_min, 0, ',', '.') }}
                            </p>
                        @endif
                    </div>
                </div>

                {{-- Submit --}}
                <div class="flex gap-3">
                    <a href="{{ route('admin.products.index') }}" wire:navigate
                        class="flex-1 text-center px-4 py-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">
                        Batal
                    </a>
                    <button type="submit"
                        class="flex-1 px-4 py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 font-bold text-sm rounded-xl hover:from-lime-400 hover:to-lime-300 transition-all shadow-sm">
                        <span wire:loading.remove wire:target="save">
                            {{ $productId ? '💾 Simpan' : '✨ Buat Produk' }}
                        </span>
                        <span wire:loading wire:target="save" class="flex items-center justify-center gap-2">
                            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Menyimpan...
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
