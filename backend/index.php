<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/classes/Project.php';
require_once __DIR__ . '/db/parametro.php';

try {
    $database = new Database();
    $project = new Project($database->getConnection());

    $method = $_SERVER['REQUEST_METHOD'];

    // Browsers send file updates as POST, so _method keeps the REST route intact.
    if ($method === 'POST' && isset($_POST['_method'])) {
        $method = strtoupper($_POST['_method']);
    }

    $input = json_decode(file_get_contents('php://input'), true);

    if (in_array($method, ['POST', 'PUT'])) {
        $input = $_POST;
    }

    switch ($method) {
        case 'GET':
            $response = isset($_GET['id'])
                ? $project->readSingle($_GET['id'])
                : $project->read();
            break;

        case 'POST':
            $response = $project->create($input, $_FILES);
            break;

        case 'PUT':
            if (isset($_GET['id'])) {
                $response = $project->update($_GET['id'], $input, $_FILES);
            } else {
                $response = ['error' => 'ID não fornecido para atualização'];
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $response = $project->delete($_GET['id']);
            } else {
                $response = ['error' => 'ID não fornecido para exclusão'];
            }
            break;

        default:
            http_response_code(405);
            $response = ['error' => 'Método não permitido'];
    }

    if ($method === 'GET' && !isset($_GET['id']) && !is_array($response)) {
        $response = ['error' => 'Formato inválido retornado pelo método read()'];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro interno do servidor',
        'message' => $e->getMessage()
    ]);
}
