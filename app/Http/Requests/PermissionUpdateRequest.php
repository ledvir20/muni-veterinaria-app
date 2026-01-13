<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermissionUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:permissions,name,' . $this->permission->id,
            'guard_name' => 'required|string|in:web,api',
        ];
    }


    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del permiso es obligatorio.',
            'name.string' => 'El nombre del permiso debe ser una cadena.',
            'name.unique' => 'El nombre del permiso ya está en uso.',
            'guard_name.required' => 'El nombre del guard es obligatorio.',
            'guard_name.string' => 'El nombre del guard debe ser una cadena.',
            'guard_name.in' => 'El nombre del guard debe ser "web" o "api".',
        ];
    }
}
