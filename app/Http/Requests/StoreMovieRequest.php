<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['string', 'required', 'max:100'],
            'poster' => ['image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'description' => ['string', 'required'],
            'duration' => ['integer', 'required'],
            'country' => ['string', 'required']
        ];
    }
}
