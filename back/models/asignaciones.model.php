<?php
require_once('../config/config.php');

class Asignacion
{
    public function todos() // Obtener todas las asignaciones
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Asignaciones`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($asignacion_id) // Obtener una asignación por ID
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Asignaciones` WHERE asignacion_id = $asignacion_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($proyecto_id, $empleado_id, $fecha_asignacion) // Insertar una nueva asignación
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Asignaciones`(`proyecto_id`, `empleado_id`, `fecha_asignacion`) 
                       VALUES ('$proyecto_id', '$empleado_id', '$fecha_asignacion')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Éxito, devolver el ID de la asignación creada
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($asignacion_id, $proyecto_id, $empleado_id, $fecha_asignacion) // Actualizar una asignación
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Asignaciones` SET 
                       `proyecto_id`='$proyecto_id', 
                       `empleado_id`='$empleado_id', 
                       `fecha_asignacion`='$fecha_asignacion'
                       WHERE `asignacion_id` = $asignacion_id";
            if (mysqli_query($con, $cadena)) {
                return $asignacion_id; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($asignacion_id) // Eliminar una asignación
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Asignaciones` WHERE `asignacion_id` = $asignacion_id";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
