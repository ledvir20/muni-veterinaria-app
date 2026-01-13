<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Asignar permisos al rol admin (todos)
        $admin->syncPermissions($permissions);

        // Permisos limitados para usuarios normales
        $userRole->syncPermissions(['view_tasks', 'create_tasks']);
    }
}
