<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('order_label', 10)->default('01');
            $table->string('short_title');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('theme', 50)->default('navy');
            $table->string('cover_image')->nullable();
            $table->text('icon_svg')->nullable();
            $table->json('sub_types_summary')->nullable();
            $table->integer('order_num')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('sku')->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->decimal('tkdn_percent', 5, 2)->nullable();
            $table->text('specs')->nullable();
            $table->string('image_url')->nullable();
            $table->string('inaproc_url')->nullable();
            $table->integer('order_num')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('agency_name')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('service_needed')->nullable();
            $table->text('message');
            $table->string('status', 30)->default('new'); // new, read, followed_up, archived
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};
