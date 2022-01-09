<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ApiController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs;

    protected $status_code;
    protected $http_code;

    public function __construct()
    {
        $this->status_code = config('staticdata.status_codes');
        $this->http_code = config('staticdata.http_codes');
    }

    public function formatPaginatedDataResponse($message, $status_code, $http_code, $additional_data = [])
    {
        $response = [
            'status_code' => $status_code,
        ];
        $response = array_merge($response, $message->toArray(), $additional_data);

        return response()->json($response, $http_code);
    }

    public function formatDataResponse($message, $status_code, $http_code)
    {
        $response = [
            'status_code' => $status_code,
            'data' => $message
        ];

        return response()->json($response, $http_code);
    }

    public function formatGeneralResponse($message, $status_code, $http_code)
    {
        $response = [
            'status_code' => $status_code,
            'message' => $message
        ];

        return response()->json($response, $http_code);
    }

    public function formatErrorResponse($data, $status_code = null, $http_response = null)
    {
        $status_code = $status_code ?? config('staticdata.status_codes.error');
        $http_response = $http_response ?? config('staticdata.http_codes.internal_server_error');

        $message = [
            'status_code' => $status_code,
            'errors' => $data,
        ];

        return response()->json($message, $http_response);
    }
}
