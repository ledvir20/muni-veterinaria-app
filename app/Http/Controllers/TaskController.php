<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('view_any_tasks', Task::class);

        return inertia('tasks/index', [
            'tasks' => Task::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create_tasks', Task::class);

        return inertia('tasks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskStoreRequest $request)
    {
        Gate::authorize('create_tasks', Task::class);

        $data = $request->validated();
        Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'is_active' => $data['is_active'] ?? false,
        ]);
        return to_route('tasks.index')->with('success', 'Task created successfully.');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Task $task)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        Gate::authorize('update_tasks', $task);

        return inertia('tasks/edit', [
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdateRequest $request, Task $task)
    {
        Gate::authorize('update_tasks', $task);

        $data = $request->validated();
        $task->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'is_active' => $data['is_active'] ?? false,
        ]);
        return to_route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('delete_tasks', $task);

        $task->delete();
        return to_route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}
