<?php
require_once('../config/config.php');

class Empleado
{
    public function todos() // select * from Empleados
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Empleados`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($empleado_id) // select * from Empleados where id = $empleado_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Empleados` WHERE empleado_id = $empleado_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $email, $posicion) // insert into Empleados
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Empleados`(`nombre`, `apellido`, `email`, `posicion`) 
                       VALUES ('$nombre', '$apellido', '$email', '$posicion')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Éxito, devolver el ID del empleado creado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($empleado_id, $nombre, $apellido, $email, $posicion) // update Empleados
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Empleados` SET 
                       `nombre`='$nombre', 
                       `apellido`='$apellido', 
                       `email`='$email', 
                       `posicion`='$posicion' 
                       WHERE `empleado_id` = $empleado_id";
            if (mysqli_query($con, $cadena)) {
                return $empleado_id; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($empleado_id) // delete from Empleados
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Empleados` WHERE `empleado_id` = $empleado_id";
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
