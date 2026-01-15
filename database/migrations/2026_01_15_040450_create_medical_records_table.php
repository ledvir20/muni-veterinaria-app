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

        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->cascadeOnDelete();
            $table->foreignId('veterinarian_id')->constrained();
            $table->foreignId('appointment_id')->nullable()->constrained();
            $table->enum('type', ["consulta","emergencia","control","vacunacion"]);
            $table->string('diagnosis');
            $table->text('description');
            $table->decimal('weight_at_visit', 5, 2)->nullable();
            $table->date('next_visit_date')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
