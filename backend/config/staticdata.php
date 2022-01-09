<?php

return [
    'status_codes' => [
        'ok' => '00',
        'validation_failed' => '21',
        'invalid_scope' => '22',
        'authentication_error' => '23',
        'permission_denied' => '24',
        'record_not_found' => '25',
        'forbidden' => '26',
        'error' => '99',
    ],

    'http_codes' => [
        'success' => '200',
        'bad_request' => '400',
        'unauthorized' => '401',
        'forbidden' => '403',
        'not_found' => '404',
        'unprocessable_entity' => '422',
        'internal_server_error' => '500',
    ],

    'messages' => [
        'action_success' => 'Action successful.',
        'not_found' => 'No data found'
    ],
];
