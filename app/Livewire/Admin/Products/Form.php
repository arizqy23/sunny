<?php

namespace App\Livewire\Admin\Products;

use App\Models\Product;
use Livewire\Component;
use Livewire\WithFileUploads;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Form extends Component
{
    use WithFileUploads;

    public ?int    $productId   = null;
    public string  $name        = '';
    public string  $slug        = '';
    public string  $tagline     = '';
    public string  $description = '';
    public string  $emoji       = '🧴';
    public string  $price_min   = '';
    public string  $price_max   = '';
    public bool    $is_active   = true;
    public bool    $is_featured = false;
    public int     $sort_order  = 0;

    // JSON fields as strings
    public string  $sizes_raw    = '';
    public string  $benefits_raw = '';

    // Color config
    public string  $color_bg     = 'from-lime-50 to-green-50';
    public string  $color_badge  = 'bg-lime-100 text-lime-700';
    public string  $color_card   = 'from-lime-200 to-green-200';
    public string  $color_accent = 'text-lime-600';
    public string  $color_btn    = 'from-lime-400 to-green-400';
    public string  $color_ring   = 'ring-lime-300';

    // Image
    public $image = null;                   // file baru (temporary Livewire upload)
    public ?string $existing_image = null;  // path yang sudah tersimpan di DB

    protected function rules(): array
    {
        return [
            'name'         => 'required|string|min:3|max:100',
            'slug'         => 'required|string|max:120|unique:products,slug,' . ($this->productId ?? 'NULL'),
            'tagline'      => 'nullable|string|max:150',
            'description'  => 'nullable|string|max:1000',
            'emoji'        => 'nullable|string|max:10',
            'price_min'    => 'nullable|numeric|min:0',
            'price_max'    => 'nullable|numeric|min:0',
            'is_active'    => 'boolean',
            'is_featured'  => 'boolean',
            'sort_order'   => 'integer|min:0',
            'sizes_raw'    => 'nullable|string',
            'benefits_raw' => 'nullable|string',
            'image'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function mount(int $id = null): void
    {
        if ($id) {
            $p = Product::findOrFail($id);
            $this->productId      = $p->id;
            $this->name           = $p->name;
            $this->slug           = $p->slug;
            $this->tagline        = $p->tagline ?? '';
            $this->description    = $p->description ?? '';
            $this->emoji          = $p->emoji ?? '🧴';
            $this->price_min      = (string)($p->price_min ?? '');
            $this->price_max      = (string)($p->price_max ?? '');
            $this->is_active      = $p->is_active;
            $this->is_featured    = $p->is_featured;
            $this->sort_order     = $p->sort_order;
            $this->sizes_raw      = implode("\n", $p->sizes ?? []);
            $this->benefits_raw   = implode("\n", $p->benefits ?? []);
            $this->existing_image = $p->image_path;

            $cfg = $p->color_config ?? [];
            $this->color_bg     = $cfg['bg']     ?? $this->color_bg;
            $this->color_badge  = $cfg['badge']  ?? $this->color_badge;
            $this->color_card   = $cfg['card']   ?? $this->color_card;
            $this->color_accent = $cfg['accent'] ?? $this->color_accent;
            $this->color_btn    = $cfg['btn']    ?? $this->color_btn;
            $this->color_ring   = $cfg['ring']   ?? $this->color_ring;
        }
    }

    public function updatedName(string $value): void
    {
        if (!$this->productId) {
            $this->slug = Str::slug($value);
        }
    }

    /** Batalkan preview foto baru (belum disimpan) */
    public function removeNewImage(): void
    {
        $this->image = null;
    }

    /** Hapus foto lama dari storage & DB */
    public function removeExistingImage(): void
    {
        if ($this->existing_image) {
            Storage::disk('public')->delete($this->existing_image);
            $this->existing_image = null;
            if ($this->productId) {
                Product::findOrFail($this->productId)->update(['image_path' => null]);
            }
        }
    }

    public function save(): void
    {
        $this->validate();

        // Tentukan path foto final
        $imagePath = $this->existing_image; // default: tetap pakai foto lama

        if ($this->image) {
            // Hapus foto lama sebelum simpan yang baru
            if ($this->existing_image) {
                Storage::disk('public')->delete($this->existing_image);
            }
            // Simpan ke storage/app/public/products/
            $imagePath = $this->image->store('products', 'public');
        }

        $data = [
            'name'         => $this->name,
            'slug'         => $this->slug,
            'tagline'      => $this->tagline ?: null,
            'description'  => $this->description ?: null,
            'emoji'        => $this->emoji,
            'price_min'    => $this->price_min ?: null,
            'price_max'    => $this->price_max ?: null,
            'is_active'    => $this->is_active,
            'is_featured'  => $this->is_featured,
            'sort_order'   => $this->sort_order,
            'image_path'   => $imagePath,
            'sizes'        => array_values(array_filter(array_map('trim', explode("\n", $this->sizes_raw)))),
            'benefits'     => array_values(array_filter(array_map('trim', explode("\n", $this->benefits_raw)))),
            'color_config' => [
                'bg'     => $this->color_bg,
                'badge'  => $this->color_badge,
                'card'   => $this->color_card,
                'accent' => $this->color_accent,
                'btn'    => $this->color_btn,
                'ring'   => $this->color_ring,
            ],
        ];

        if ($this->productId) {
            Product::findOrFail($this->productId)->update($data);
            session()->flash('toast', ['type' => 'success', 'message' => 'Produk berhasil diperbarui!']);
        } else {
            Product::create($data);
            session()->flash('toast', ['type' => 'success', 'message' => 'Produk baru berhasil dibuat!']);
        }

        $this->redirect(route('admin.products.index'), navigate: true);
    }

    public function render()
    {
        $title = $this->productId ? 'Edit Produk' : 'Tambah Produk';
        return view('admin.products.form')
            ->layout('admin.layouts.app', ['title' => $title]);
    }
}
