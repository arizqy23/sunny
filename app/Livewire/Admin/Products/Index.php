<?php

namespace App\Livewire\Admin\Products;

use App\Models\Product;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search   = '';
    public string $status   = '';
    public string $sortBy   = 'sort_order';
    public string $sortDir  = 'asc';
    public ?int   $deleteId = null;
    public bool   $showDeleteModal = false; // ← DIPERBAIKI: nama diubah dari confirmDelete

    protected $paginationTheme = 'tailwind';

    public function updatingSearch(): void  { $this->resetPage(); }
    public function updatingStatus(): void  { $this->resetPage(); }

    public function sort(string $col): void
    {
        if ($this->sortBy === $col) {
            $this->sortDir = $this->sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            $this->sortBy  = $col;
            $this->sortDir = 'asc';
        }
    }

    public function toggleActive(int $id): void
    {
        $product = Product::findOrFail($id);
        $product->update(['is_active' => !$product->is_active]);
        session()->flash('toast', [
            'type'    => 'success',
            'message' => 'Status produk berhasil diperbarui.',
        ]);
    }

    public function confirmDelete(int $id): void
    {
        $this->deleteId        = $id;
        $this->showDeleteModal = true; // ← DIPERBAIKI
    }

    public function deleteProduct(): void
    {
        if ($this->deleteId) {
            $product = Product::findOrFail($this->deleteId);
            if ($product->image_path) {
                \Illuminate\Support\Facades\Storage::disk("public")->delete($product->image_path);
            }
            $product->delete();
            session()->flash('toast', [
                'type'    => 'success',
                'message' => 'Produk berhasil dihapus.',
            ]);
        }
        $this->deleteId        = null;
        $this->showDeleteModal = false; // ← DIPERBAIKI
    }

    public function cancelDelete(): void
    {
        $this->deleteId        = null;
        $this->showDeleteModal = false; // ← DIPERBAIKI
    }

    public function render()
    {
        $products = Product::query()
            ->when($this->search, fn($q) => $q->where('name', 'like', "%{$this->search}%")
                ->orWhere('tagline', 'like', "%{$this->search}%"))
            ->when($this->status === 'active',   fn($q) => $q->where('is_active', true))
            ->when($this->status === 'inactive', fn($q) => $q->where('is_active', false))
            ->orderBy($this->sortBy, $this->sortDir)
            ->paginate(10);

        return view('admin.products.index', compact('products'))
            ->layout('admin.layouts.app', ['title' => 'Manajemen Produk']);
    }
}
