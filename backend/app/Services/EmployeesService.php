<?php

namespace App\Services;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeesService extends BaseService
{

    public function list()
    {
        $employees = Employee::all();

        return $employees;
    }

    public function create($input)
    {
        try {
            $employee_input = [
                'first_name' => $input['first_name'],
                'last_name' => $input['last_name'],
                'email' => $input['email'],
                'phone_no' => $input['phone_no'],
                'join_date' => $input['join_date'],
                'job_title' => $input['job_title'],
                'manager_id' => $input['manager_id'],
            ];
            $employees = Employee::create($employee_input);
        } catch (\Exception $e) {
            \Log::error($e);
            $message = $e->getMessage();
            return $this->formatGeneralResponse(
                $message,
                config('staticdata.status_codes.error'),
                config('staticdata.http_codes.internal_server_error')
            );
        }

        return $this->formatGeneralResponse(
            config('staticdata.messages.action_success'),
            config('staticdata.status_codes.ok'),
            config('staticdata.http_codes.success')
        );
    }

    public function update($input, $id)
    {
        $employees = Employee::find($id);

        if (!$employees) {
            return $this->formatGeneralResponse(
                [config('staticdata.messages.not_found')],
                config('staticdata.status_codes.record_not_found'),
                config('staticdata.http_codes.bad_request')
            );
        }

        try {
            $employee_input = [
                'first_name' => $input['first_name'],
                'last_name' => $input['last_name'],
                'email' => $input['email'],
                'phone_no' => $input['phone_no'],
                'join_date' => $input['join_date'],
                'job_title' => $input['job_title'],
                'manager_id' => $input['manager_id'],
            ];

            $employees->update($employee_input);
            $employees->save();
        } catch (\Exception $e) {
            \Log::error($e);
            return $this->formatGeneralResponse(
                $e->getMessage(),
                config('staticdata.status_codes.error'),
                config('staticdata.http_codes.internal_server_error')
            );
        }

        return $this->formatGeneralResponse(
            config('staticdata.messages.action_success'),
            config('staticdata.status_codes.ok'),
            config('staticdata.http_codes.success')
        );
    }

    public function details($id)
    {
        $employees = Employee::all()->find($id);

        if (!$employees) {
            return $this->formatGeneralResponse(
                [config('staticdata.messages.not_found')],
                config('staticdata.status_codes.record_not_found'),
                config('staticdata.http_codes.bad_request')
            );
        }
        return $employees;
    }

    public function delete($id)
    {
        $employees = Employee::find($id);

        if (!$employees) {
            return $this->formatGeneralResponse(
                [config('staticdata.messages.not_found')],
                config('staticdata.status_codes.record_not_found'),
                config('staticdata.http_codes.bad_request')
            );
        }

        $employees->delete();

        return $this->formatGeneralResponse(
            config('staticdata.messages.action_success'),
            config('staticdata.status_codes.ok'),
            config('staticdata.http_codes.success')
        );
    }
}
