<div class="space-y-5 max-w-4xl">

    {{-- Header --}}
    <div class="flex items-center gap-3">
        <a href="{{ route('admin.articles.index') }}" wire:navigate
            class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </a>
        <div>
            <h2 class="text-2xl font-bold text-slate-900">{{ $articleId ? 'Edit Artikel' : 'Tulis Artikel Baru' }}</h2>
            <p class="text-slate-500 text-sm mt-0.5">{{ $articleId ? 'Perbarui konten artikel' : 'Bagikan tips dapur untuk pelanggan Sunny' }}</p>
        </div>
    </div>

    <form wire:submit="save" class="space-y-5">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {{-- LEFT: Content --}}
            <div class="lg:col-span-2 space-y-4">

                {{-- Basic Info --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">📋 Informasi Artikel</h3>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Judul Artikel *</label>
                        <input wire:model.live="title" type="text"
                            placeholder="Contoh: 7 Cara Mencuci Piring yang Benar..."
                            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all @error('title') border-red-400 bg-red-50 @enderror">
                        @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Slug URL *</label>
                        <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-lime-500/30 focus-within:border-lime-500 @error('slug') border-red-400 @enderror">
                            <span class="px-3 py-2.5 bg-slate-50 text-slate-400 text-xs font-mono border-r border-slate-200 flex-shrink-0">/artikel/</span>
                            <input wire:model="slug" type="text"
                                class="flex-1 px-3 py-2.5 text-sm font-mono focus:outline-none bg-white min-w-0">
                        </div>
                        @error('slug') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Ringkasan / Excerpt</label>
                        <textarea wire:model="excerpt" rows="3"
                            placeholder="Ringkasan singkat artikel yang akan ditampilkan di halaman daftar..."
                            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all resize-none"></textarea>
                        <p class="text-slate-400 text-xs mt-1 text-right">{{ strlen($excerpt) }}/500</p>
                    </div>
                </div>

                {{-- Image Upload --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">🖼️ Foto / Gambar Artikel</h3>

                    @if ($image)
                        {{-- Preview: new upload --}}
                        <div class="relative group rounded-2xl overflow-hidden border border-slate-200">
                            <img src="{{ $image->temporaryUrl() }}" alt="Preview"
                                class="w-full h-48 object-cover">
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button type="button" wire:click="removeImage"
                                    class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-red-700 transition-colors">
                                    🗑️ Hapus Foto
                                </button>
                            </div>
                        </div>
                        <p class="text-slate-400 text-xs text-center">Foto baru siap diupload</p>

                    @elseif ($existingImage)
                        {{-- Preview: existing from DB --}}
                        <div class="relative group rounded-2xl overflow-hidden border border-slate-200">
                            <img src="{{ Storage::url($existingImage) }}" alt="Foto Artikel"
                                class="w-full h-48 object-cover">
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button type="button" wire:click="removeImage"
                                    class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-red-700 transition-colors">
                                    🗑️ Hapus Foto
                                </button>
                            </div>
                        </div>
                        <p class="text-slate-400 text-xs text-center">Foto artikel saat ini — hover untuk mengganti</p>

                    @else
                        {{-- Drop zone --}}
                        <label for="article-image"
                            class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-lime-50 hover:border-lime-400 transition-all group">
                            <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                            <p class="text-sm font-semibold text-slate-600 group-hover:text-lime-700">Klik atau seret foto ke sini</p>
                            <p class="text-xs text-slate-400 mt-1">PNG, JPG, WEBP — maks. 2MB</p>
                            <input id="article-image" type="file" wire:model="image" accept="image/*" class="hidden">
                        </label>
                    @endif

                    {{-- Loading indicator while uploading --}}
                    <div wire:loading wire:target="image" class="flex items-center justify-center gap-2 py-2">
                        <svg class="animate-spin w-4 h-4 text-lime-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span class="text-sm text-slate-500">Mengupload foto...</span>
                    </div>

                    @error('image')
                        <p class="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <span>⚠️</span> {{ $message }}
                        </p>
                    @enderror

                    {{-- Replace button when image already exists --}}
                    @if ($image || $existingImage)
                        <label for="article-image-replace"
                            class="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                            </svg>
                            Ganti Foto
                            <input id="article-image-replace" type="file" wire:model="image" accept="image/*" class="hidden">
                        </label>
                    @endif
                </div>

                {{-- Content Editor --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 class="font-bold text-slate-900 text-sm">✍️ Konten Artikel</h3>
                        <span class="text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded-lg font-mono">HTML supported</span>
                    </div>

                    {{-- Toolbar --}}
                    <div class="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                        @foreach([
                            ['label' => 'H2',    'insert' => '<h2></h2>'],
                            ['label' => 'H3',    'insert' => '<h3></h3>'],
                            ['label' => 'P',     'insert' => '<p></p>'],
                            ['label' => 'Bold',  'insert' => '<strong></strong>'],
                            ['label' => 'UL',    'insert' => '<ul><li></li></ul>'],
                            ['label' => 'OL',    'insert' => '<ol><li></li></ol>'],
                            ['label' => 'Quote', 'insert' => '<blockquote></blockquote>'],
                        ] as $btn)
                        <button type="button"
                            onclick="insertTag('{{ $btn['insert'] }}')"
                            class="px-2.5 py-1 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-lime-50 hover:border-lime-300 hover:text-lime-700 transition-all">
                            {{ $btn['label'] }}
                        </button>
                        @endforeach
                    </div>

                    <textarea wire:model="content" id="content-editor" rows="16"
                        placeholder="<p>Tulis konten artikel di sini...</p>&#10;&#10;<h2>Subjudul Pertama</h2>&#10;<p>Isi paragraf...</p>"
                        class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all resize-y leading-relaxed text-slate-700"></textarea>
                </div>
            </div>

            {{-- RIGHT: Meta & Settings --}}
            <div class="space-y-4">

                {{-- Publish --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">⚙️ Pengaturan</h3>

                    <label class="flex items-center justify-between gap-3 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-slate-700">Publikasikan</p>
                            <p class="text-xs text-slate-400">Tampil di website</p>
                        </div>
                        <div class="relative flex-shrink-0">
                            <input wire:model="is_published" type="checkbox" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-checked:bg-lime-500 rounded-full transition-colors"></div>
                            <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>

                    <label class="flex items-center justify-between gap-3 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-slate-700">Artikel Unggulan</p>
                            <p class="text-xs text-slate-400">Tampil di bagian featured</p>
                        </div>
                        <div class="relative flex-shrink-0">
                            <input wire:model="is_featured" type="checkbox" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-checked:bg-sunny-400 rounded-full transition-colors"></div>
                            <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>
                </div>

                {{-- Meta --}}
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                    <h3 class="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">🏷️ Meta Artikel</h3>

                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Kategori</label>
                        <input wire:model="category" type="text" list="categories-list"
                            placeholder="Tips Bersih"
                            class="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        <datalist id="categories-list">
                            <option value="Tips Bersih">
                            <option value="Kesehatan">
                            <option value="Lingkungan">
                            <option value="Resep">
                            <option value="Inspirasi">
                        </datalist>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Penulis</label>
                        <input wire:model="author" type="text" placeholder="Tim Sunny"
                            class="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Estimasi Baca</label>
                        <input wire:model="read_time" type="text" placeholder="5 menit"
                            class="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">Emoji</label>
                            <input wire:model="emoji" type="text" placeholder="📝" maxlength="5"
                                class="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xl text-center focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">Warna Card</label>
                            <input wire:model="color" type="text" placeholder="from-lime-100..."
                                class="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
                        </div>
                    </div>
                </div>

                {{-- Preview --}}
                <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-white/[0.06]">
                    <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Preview Card</p>
                    <div class="bg-white rounded-2xl overflow-hidden">
                        {{-- Show uploaded image preview in card, fallback to emoji gradient --}}
                        @if ($image)
                            <div class="h-20 overflow-hidden">
                                <img src="{{ $image->temporaryUrl() }}" class="w-full h-full object-cover" alt="Preview">
                            </div>
                        @elseif ($existingImage)
                            <div class="h-20 overflow-hidden">
                                <img src="{{ Storage::url($existingImage) }}" class="w-full h-full object-cover" alt="Foto Artikel">
                            </div>
                        @else
                            <div class="h-20 bg-gradient-to-br {{ $color ?: 'from-lime-100 to-green-100' }} flex items-center justify-center text-4xl">
                                {{ $emoji ?: '📝' }}
                            </div>
                        @endif
                        <div class="p-3">
                            <span class="text-[10px] font-bold text-lime-600 bg-lime-50 px-2 py-0.5 rounded-full">
                                {{ $category ?: 'Kategori' }}
                            </span>
                            <p class="text-slate-900 text-xs font-bold mt-1.5 leading-snug line-clamp-2">
                                {{ $title ?: 'Judul artikel akan tampil di sini...' }}
                            </p>
                            <p class="text-slate-400 text-[10px] mt-1">{{ $read_time ?: '— menit' }} baca</p>
                        </div>
                    </div>
                </div>

                {{-- Actions --}}
                <div class="flex gap-3">
                    <a href="{{ route('admin.articles.index') }}" wire:navigate
                        class="flex-1 text-center px-4 py-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">
                        Batal
                    </a>
                    <button type="submit"
                        class="flex-1 px-4 py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 font-bold text-sm rounded-xl hover:from-lime-400 hover:to-sunny-400 transition-all shadow-sm">
                        <span wire:loading.remove wire:target="save">
                            {{ $articleId ? '💾 Simpan' : '✨ Publikasikan' }}
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

<script>
function insertTag(tag) {
    const ta = document.getElementById('content-editor');
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = ta.value.substring(start, end);
    const [open, close] = tag.split('><').length > 1
        ? [tag.split('>')[0] + '>', '</' + tag.split('</')[1]]
        : [tag, ''];
    const newText = open + sel + close;
    ta.setRangeText(newText, start, end, 'select');
    ta.dispatchEvent(new Event('input'));
    ta.focus();
}
</script>
