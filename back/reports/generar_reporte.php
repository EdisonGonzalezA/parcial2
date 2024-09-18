<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
/*
require('fpdf/fpdf.php');
require_once("../models/productos.model.php");
$pdf = new FPDF();
$pdf->AddPage();
$productos = new Producto();


//encabezado
$pdf->SetFont('Arial', 'B', 12);
//             x      y        texto
$pdf->Text(30, 10, 'Title');


$pdf->SetFont('Arial', '', 12);
$texto = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quas officiis nisi, laudantium corrupti eaque libero laborum, veniam, sapiente molestiae quidem sequi fugit voluptatum illum fuga ipsa commodi minima. Aperiam.";
$pdf->MultiCell(0, 5, iconv('UTF-8', 'windows-1252', $texto), 0, 'J');



//uso de POO para reporte
$listaproductos = $productos->todos();
$x = 10;
$y = 35;

$pdf->Cell(10, 10, "#", 1);
$pdf->Cell(40, 10, "Codigo de Barras", 1);
$pdf->Cell(40, 10, "Nombre", 1);
$pdf->Cell(40, 10, "IVA", 1);

$index = 1;
$pdf->Ln();
while ($prod = mysqli_fetch_assoc($listaproductos)) {
    //          Ancho     alto de la celda
    $pdf->Cell(10, 10, $index, 1);
    $pdf->Cell(40, 10, $prod["Codigo_Barras"], 1);
    $pdf->Cell(40, 10, $prod["Nombre_Producto"], 1);
    $pdf->Cell(40, 10, $prod["Graba_IVA"], 1);
    $pdf->Ln();
    $index++;
}
$pdf->Image('../public/images/image.png', 50, 110, 100, 0, "PNG");



//pie de pagina
$pdf->Image('https://www.uniandes.edu.ec/wp-content/uploads/2024/07/2-headerweb-home-2.png', 0, 282, 15, 0, 'PNG');

$pdf->Cell(0, 10, 'Page ' . $pdf->PageNo(), 0, 0, 'C');
$pdf->Output();*/

require('fpdf/fpdf.php');
require_once("../models/asignaciones.model.php");

class PDF extends FPDF
{

    // Cabecera de página
    function Header()
    {
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 10, utf8_decode('Reporte de Proyectos, Empleados y Asignaciones'), 0, 1, 'C');
        $this->Ln(10);
    }

    // Pie de página
    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo(), 0, 0, 'C');
    }

    // Tabla de datos
    function TablaAsignaciones($header, $data)
    {
        $this->SetFont('Arial', 'B', 10);
        // Cabeceras
        foreach ($header as $col)
            $this->Cell(40, 7, utf8_decode($col), 1);
        $this->Ln();

        $this->SetFont('Arial', '', 10);
        // Datos
        foreach ($data as $row) {
            $this->Cell(40, 6, utf8_decode($row['proyecto']), 1); // Convertir datos del proyecto
            $this->Cell(40, 6, utf8_decode($row['empleado']), 1); // Convertir datos del empleado
            $this->Cell(40, 6, utf8_decode($row['fecha_asignacion']), 1); // Convertir la fecha
            $this->Ln();
        }
    }
}

// Crear el objeto PDF
$pdf = new PDF();
$pdf->AddPage();

// Títulos de las columnas
$header = array('Proyecto', 'Empleado', 'Fecha de Asignación');

// Conectar a la base de datos
$con = new ClaseConectar();
$con = $con->ProcedimientoParaConectar();

// Obtener datos de la base de datos
$query = "
    SELECT p.nombre AS proyecto, CONCAT(e.nombre, ' ', e.apellido) AS empleado, a.fecha_asignacion
    FROM Asignaciones a
    INNER JOIN Proyectos p ON a.proyecto_id = p.proyecto_id
    INNER JOIN Empleados e ON a.empleado_id = e.empleado_id
";
$result = mysqli_query($con, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Imprimir la tabla
$pdf->TablaAsignaciones($header, $data);

// Cerrar la conexión
$con->close();

// Enviar el archivo PDF al navegador
$pdf->Output('D', 'Reporte_Asignaciones.pdf'); // 'D' fuerza la descarga del archivo
