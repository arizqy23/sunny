<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->string('emoji', 10)->nullable();
            $table->json('color_config')->nullable(); // bg, badge, btn, card, accent, ring colors
            $table->decimal('price_min', 10, 0)->nullable();
            $table->decimal('price_max', 10, 0)->nullable();
            $table->json('sizes')->nullable();    // ['250ml', '500ml', '800ml', '1L']
            $table->json('benefits')->nullable(); // array of benefit strings
            $table->json('specs')->nullable();    // [{label, value}, ...]
            $table->string('image_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
            $table->index(['is_active', 'is_featured']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
