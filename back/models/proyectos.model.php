<?php
require_once('../config/config.php');

class Proyecto
{
    public function todos() // select * from Proyectos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Proyectos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($proyecto_id) // select * from Proyectos where id = $proyecto_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Proyectos` WHERE proyecto_id = $proyecto_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $descripcion, $fecha_inicio, $fecha_fin) // insert into Proyectos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Proyectos`(`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
                       VALUES ('$nombre', '$descripcion', '$fecha_inicio', '$fecha_fin')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Éxito, devolver el ID del proyecto creado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($proyecto_id, $nombre, $descripcion, $fecha_inicio, $fecha_fin) // update Proyectos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Proyectos` SET 
                       `nombre`='$nombre', 
                       `descripcion`='$descripcion', 
                       `fecha_inicio`='$fecha_inicio', 
                       `fecha_fin`='$fecha_fin' 
                       WHERE `proyecto_id` = $proyecto_id";
            if (mysqli_query($con, $cadena)) {
                return $proyecto_id; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($proyecto_id) // delete from Proyectos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Proyectos` WHERE `proyecto_id` = $proyecto_id";
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
