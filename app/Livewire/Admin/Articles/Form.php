<?php

namespace App\Livewire\Admin\Articles;

use App\Models\Article;
use Livewire\Component;
use Livewire\WithFileUploads;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Form extends Component
{
    use WithFileUploads;

    public ?int    $articleId    = null;
    public string  $title        = '';
    public string  $slug         = '';
    public string  $excerpt      = '';
    public string  $content      = '';
    public string  $category     = '';
    public string  $emoji        = '📝';
    public string  $color        = 'from-lime-100 to-green-100';
    public string  $read_time    = '';
    public string  $author       = '';
    public bool    $is_published  = false;
    public bool    $is_featured   = false;

    // Image fields
    public $image         = null;  // temporary upload (Livewire TemporaryUploadedFile)
    public ?string $existingImage = null; // path already stored in DB

    protected function rules(): array
    {
        return [
            'title'        => 'required|string|min:5|max:200',
            'slug'         => 'required|string|max:220|unique:articles,slug,' . ($this->articleId ?? 'NULL'),
            'excerpt'      => 'nullable|string|max:500',
            'content'      => 'nullable|string',
            'category'     => 'nullable|string|max:50',
            'emoji'        => 'nullable|string|max:10',
            'color'        => 'nullable|string|max:100',
            'read_time'    => 'nullable|string|max:30',
            'author'       => 'nullable|string|max:100',
            'is_published' => 'boolean',
            'is_featured'  => 'boolean',
            'image'        => 'nullable|image|max:2048', // max 2MB
        ];
    }

    public function mount(int $id = null): void
    {
        if ($id) {
            $a = Article::findOrFail($id);
            $this->articleId    = $a->id;
            $this->title        = $a->title;
            $this->slug         = $a->slug;
            $this->excerpt      = $a->excerpt ?? '';
            $this->content      = $a->content ?? '';
            $this->category     = $a->category ?? '';
            $this->emoji        = $a->emoji ?? '📝';
            $this->color        = $a->color ?? 'from-lime-100 to-green-100';
            $this->read_time    = $a->read_time ?? '';
            $this->author       = $a->author ?? '';
            $this->is_published = $a->is_published;
            $this->is_featured  = $a->is_featured;
            $this->existingImage = $a->image ?? null;
        }
    }

    public function updatedTitle(string $value): void
    {
        if (!$this->articleId) {
            $this->slug = Str::slug($value);
        }
    }

    public function removeImage(): void
    {
        $this->image         = null;
        $this->existingImage = null;
    }

    public function save(): void
    {
        $this->validate();

        // Handle image upload
        $imagePath = $this->existingImage; // keep existing by default

        if ($this->image) {
            // Delete old image if replacing
            if ($this->existingImage) {
                Storage::disk('public')->delete($this->existingImage);
            }
            $imagePath = $this->image->store('articles', 'public');
        }

        $data = [
            'title'        => $this->title,
            'slug'         => $this->slug,
            'excerpt'      => $this->excerpt ?: null,
            'content'      => $this->content ?: null,
            'category'     => $this->category ?: null,
            'emoji'        => $this->emoji,
            'color'        => $this->color,
            'read_time'    => $this->read_time ?: null,
            'author'       => $this->author ?: null,
            'is_published' => $this->is_published,
            'is_featured'  => $this->is_featured,
            'published_at' => $this->is_published ? now() : null,
            'image'        => $imagePath,
        ];

        if ($this->articleId) {
            Article::findOrFail($this->articleId)->update($data);
            session()->flash('toast', ['type' => 'success', 'message' => 'Artikel berhasil diperbarui!']);
        } else {
            Article::create($data);
            session()->flash('toast', ['type' => 'success', 'message' => 'Artikel baru berhasil dibuat!']);
        }

        $this->redirect(route('admin.articles.index'), navigate: true);
    }

    public function render()
    {
        $title = $this->articleId ? 'Edit Artikel' : 'Tulis Artikel';
        return view('admin.articles.form')
            ->layout('admin.layouts.app', ['title' => $title]);
    }
}
