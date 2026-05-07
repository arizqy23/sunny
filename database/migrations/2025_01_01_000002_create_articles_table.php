<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('category', 50)->nullable();
            $table->string('emoji', 10)->nullable();
            $table->string('color')->nullable();         // tailwind gradient classes
            $table->string('image')->nullable();         // stored path: articles/xxx.jpg
            $table->string('read_time', 20)->nullable(); // e.g. "4 menit"
            $table->string('author', 100)->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->unsignedInteger('views')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'published_at']);
            $table->index(['is_published', 'is_featured']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
