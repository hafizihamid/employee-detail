<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\EmployeesRequest;
use App\Services\EmployeesService;

class EmployeesController extends ApiController
{
    protected $employee_service;

    public function __construct()
    {
        parent::__construct();
        $this->employee_service = new EmployeesService;
    }

    public function list(Request $request)
    {
        $data = $this->employee_service->list();

        return $this->formatDataResponse($data, $this->status_code['ok'], $this->http_code['success']);
    }

    public function create(EmployeesRequest $request)
    {
        $data = $this->employee_service->create($request->all());

        if ($data['status'] != $this->status_code['ok']) {
            return $this->formatErrorResponse([$data['message']], $data['status'], $data['http_code']);
        }

        return $this->formatGeneralResponse($data['message'], $data['status'], $data['http_code']);
    }

    public function details($id)
    {
        $data = $this->employee_service->details($id);

        return $this->formatDataResponse($data, $this->status_code['ok'], $this->http_code['success']);
    }

    public function update(EmployeesRequest $request, $id)
    {
        $data = $this->employee_service->update($request->all(), $id);

        if ($data['status'] != $this->status_code['ok']) {
            return $this->formatErrorResponse([$data['message']], $data['status'], $data['http_code']);
        }

        return $this->formatGeneralResponse($data['message'], $data['status'], $data['http_code']);
    }

    public function delete(EmployeesRequest $request, $id)
    {
        $data = $this->employee_service->delete($request->id);

        if ($data['status'] != $this->status_code['ok']) {
            return $this->formatErrorResponse([$data['message']], $data['status'], $data['http_code']);
        }

        return $this->formatGeneralResponse($data['message'], $data['status'], $data['http_code']);
    }
}
