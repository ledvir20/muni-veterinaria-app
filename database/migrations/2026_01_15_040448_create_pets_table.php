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
        Schema::disableForeignKeyConstraints();

        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique()->nullable();
            $table->string('name');
            $table->enum('species', ["perro","gato","otro"]);
            $table->string('breed')->nullable();
            $table->date('birth_date')->nullable();
            $table->integer('age');
            $table->enum('age_unit', ["meses","anios"]);
            $table->enum('gender', ["M","H"]);
            $table->string('color')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->string('microchip')->unique()->nullable();
            $table->boolean('is_sterilized')->default(false);
            $table->enum('vaccination_status', ["si","no","parcial"])->default('no');
            $table->text('observations')->nullable();
            $table->string('photo_path')->nullable();
            $table->enum('status', ["pendiente","validado","rechazado"])->default('pendiente');
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
