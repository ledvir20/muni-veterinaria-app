<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view_tasks',
            'view_any_tasks',
            'create_tasks',
            'update_tasks',
            'delete_tasks',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $veterinarianRole = Role::firstOrCreate(['name' => 'veterinarian']);
        $ownerRole = Role::firstOrCreate(['name' => 'owner']);

        // Asignar permisos al rol admin (todos)
        $adminRole->syncPermissions($permissions);

        // Permisos limitados para veterinarios
        $veterinarianRole->syncPermissions(['view_tasks', 'create_tasks']);

        // Permisos limitados para usuarios normales
        $ownerRole->syncPermissions(['view_tasks', 'create_tasks']);
    }
}
