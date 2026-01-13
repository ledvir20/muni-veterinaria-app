<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('roles/index', [
            'roles' => RoleResource::collection(Role::with('permissions')->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('roles/create', [
            'permissions' => PermissionResource::collection(\Spatie\Permission\Models\Permission::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleStoreRequest $request)
    {
        $data = $request->validated();

        $newRole = Role::create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);

        if ($request->filled('permissions')) {
            $newRole->givePermissionTo($request->input('permissions'));
        }

        return to_route('roles.index');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Role $role)
    // {
    //     // return inertia('roles/show', [
    //     //     'role' => $role
    //     // ]);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return inertia('roles/edit', [
            'role' => RoleResource::make($role->load('permissions')),
            'permissions' => PermissionResource::collection(\Spatie\Permission\Models\Permission::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleUpdateRequest $request, Role $role)
    {
        $data = $request->validated();
        $role->update([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);

        $role->syncPermissions($request->input('permissions', []));

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return to_route('roles.index');
    }
}
