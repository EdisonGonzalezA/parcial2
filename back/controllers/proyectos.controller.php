<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/proyectos.model.php');
error_reporting(0);
$proyecto = new Proyecto;

switch ($_GET["op"]) {

    case 'todos': // Procedimiento para cargar todos los proyectos
        $datos = array();
        $datos = $proyecto->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un proyecto por ID
        if (!isset($_POST["proyecto_id"])) {
            echo json_encode(["error" => "Project ID not specified."]);
            exit();
        }
        $proyecto_id = intval($_POST["proyecto_id"]);
        $datos = array();
        $datos = $proyecto->uno($proyecto_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo proyecto
        if (!isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];

        $datos = array();
        $datos = $proyecto->insertar($nombre, $descripcion, $fecha_inicio, $fecha_fin);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un proyecto existente
        if (!isset($_POST["proyecto_id"]) || !isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $proyecto_id = intval($_POST["proyecto_id"]);
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];

        $datos = array();
        $datos = $proyecto->actualizar($proyecto_id, $nombre, $descripcion, $fecha_inicio, $fecha_fin);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un proyecto
        if (!isset($_POST["proyecto_id"])) {
            echo json_encode(["error" => "Project ID not specified."]);
            exit();
        }
        $proyecto_id = intval($_POST["proyecto_id"]);
        $datos = array();
        $datos = $proyecto->eliminar($proyecto_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
