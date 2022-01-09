<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeesRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        $routeName = $this->route()->getName();

        $rules = [
            'id' => 'numeric|exists:employees,id',
        ];

        if ($routeName == 'create') {
            $rules['first_name'] = 'required';
            $rules['last_name'] = 'required';
            $rules['email'] = 'required|email|unique:employees';
            $rules['phone_no'] = 'required';
            $rules['join_date'] = 'required|date_format:Y-m-d';
            $rules['job_title'] = 'required';
            $rules['manager_id'] = 'required';
        }
        return $rules;
    }

    public function all($keys = null)
    {
        $data = parent::all();
        if ($this->route('id')) {
            $data['id'] = $this->route('id');
        }

        return $data;
    }
}
