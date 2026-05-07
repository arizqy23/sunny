<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'tagline', 'description',
        'emoji', 'color_config',
        'price_min', 'price_max',
        'sizes', 'benefits', 'specs',
        'ingredients', 'how_to_use',
        'is_active', 'is_featured', 'sort_order',
        'image_path',
    ];

    protected $casts = [
        'color_config' => 'array',
        'sizes'        => 'array',
        'benefits'     => 'array',
        'specs'        => 'array',
        'is_active'    => 'boolean',
        'is_featured'  => 'boolean',
        'price_min'    => 'decimal:0',
        'price_max'    => 'decimal:0',
    ];

    // ── Scopes ────────────────────────────────────────────────
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    // ── Accessors ─────────────────────────────────────────────
    public function getPriceRangeAttribute(): string
    {
        $min = 'Rp ' . number_format($this->price_min, 0, ',', '.');
        $max = 'Rp ' . number_format($this->price_max, 0, ',', '.');
        return "{$min} – {$max}";
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
