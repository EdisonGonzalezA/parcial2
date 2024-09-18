<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/asignaciones.model.php');
error_reporting(0);
$asignacion = new Asignacion;

switch ($_GET["op"]) {

    case 'todos': // Obtener todas las asignaciones
        $datos = array();
        $datos = $asignacion->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Obtener una asignación por ID
        if (!isset($_POST["asignacion_id"])) {
            echo json_encode(["error" => "Asignación ID not specified."]);
            exit();
        }
        $asignacion_id = intval($_POST["asignacion_id"]);
        $datos = array();
        $datos = $asignacion->uno($asignacion_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Insertar una nueva asignación
        if (!isset($_POST["proyecto_id"]) || !isset($_POST["empleado_id"]) || !isset($_POST["fecha_asignacion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $proyecto_id = intval($_POST["proyecto_id"]);
        $empleado_id = intval($_POST["empleado_id"]);
        $fecha_asignacion = $_POST["fecha_asignacion"];

        $datos = array();
        $datos = $asignacion->insertar($proyecto_id, $empleado_id, $fecha_asignacion);
        echo json_encode($datos);
        break;

    case 'actualizar': // Actualizar una asignación existente
        if (!isset($_POST["asignacion_id"]) || !isset($_POST["proyecto_id"]) || !isset($_POST["empleado_id"]) || !isset($_POST["fecha_asignacion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $asignacion_id = intval($_POST["asignacion_id"]);
        $proyecto_id = intval($_POST["proyecto_id"]);
        $empleado_id = intval($_POST["empleado_id"]);
        $fecha_asignacion = $_POST["fecha_asignacion"];

        $datos = array();
        $datos = $asignacion->actualizar($asignacion_id, $proyecto_id, $empleado_id, $fecha_asignacion);
        echo json_encode($datos);
        break;

    case 'eliminar': // Eliminar una asignación
        if (!isset($_POST["asignacion_id"])) {
            echo json_encode(["error" => "Asignación ID not specified."]);
            exit();
        }
        $asignacion_id = intval($_POST["asignacion_id"]);
        $datos = array();
        $datos = $asignacion->eliminar($asignacion_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
