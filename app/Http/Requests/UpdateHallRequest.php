<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHallRequest extends FormRequest
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
            'rows' => ['integer', 'max:100'],
            'seats_in_row' => ['integer', 'max:100'],
            'name' => ['string', 'max:100'],
            'vip_price' => ['numeric'],
            'common_price' => ['numeric'],
            'open_sale' => [],
        ];
    }
}
