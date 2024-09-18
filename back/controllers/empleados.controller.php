<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/empleados.model.php');
error_reporting(0);
$empleado = new Empleado;

switch ($_GET["op"]) {

    case 'todos': // Procedimiento para cargar todos los empleados
        $datos = array();
        $datos = $empleado->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un empleado por ID
        if (!isset($_POST["empleado_id"])) {
            echo json_encode(["error" => "Employee ID not specified."]);
            exit();
        }
        $empleado_id = intval($_POST["empleado_id"]);
        $datos = array();
        $datos = $empleado->uno($empleado_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo empleado
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["posicion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $posicion = $_POST["posicion"];

        $datos = array();
        $datos = $empleado->insertar($nombre, $apellido, $email, $posicion);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un empleado existente
        if (!isset($_POST["empleado_id"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["posicion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $empleado_id = intval($_POST["empleado_id"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $posicion = $_POST["posicion"];

        $datos = array();
        $datos = $empleado->actualizar($empleado_id, $nombre, $apellido, $email, $posicion);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un empleado
        if (!isset($_POST["empleado_id"])) {
            echo json_encode(["error" => "Employee ID not specified."]);
            exit();
        }
        $empleado_id = intval($_POST["empleado_id"]);
        $datos = array();
        $datos = $empleado->eliminar($empleado_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
