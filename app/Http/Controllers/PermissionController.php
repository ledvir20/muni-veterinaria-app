<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionStoreRequest;
use App\Http\Requests\PermissionUpdateRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('permissions/index', [
            'permissions' => Permission::with('roles')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('permissions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionStoreRequest $request)
    {
        $data = $request->validated();
        Permission::create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);
        return to_route('permissions.index')->with('success', 'Permission created successfully.');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Permission $permission)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        return inertia('permissions/edit', [
            'permission' => $permission->load('roles')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionUpdateRequest $request, Permission $permission)
    {
        $data = $request->validated();
        $permission->update([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);
        return to_route('permissions.index')->with('success', 'Permission updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();
        return to_route('permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
