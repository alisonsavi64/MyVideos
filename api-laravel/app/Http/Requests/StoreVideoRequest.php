<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'media' => 'required|file|mimes:mp4,mov,avi',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif',
        ];
    }

        /**
     * Get the custom validation messages for the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'category.exists' => 'The selected category does not exist.',
            'media.max' => 'The media file may not be greater than :max kilobytes.',
            'thumbnail.max' => 'The thumbnail may not be greater than :max kilobytes.',
        ];
    }
}
