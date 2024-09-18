export interface Iasignacion {
    asignacion_id?: number;  // ID opcional, generado automáticamente
    proyecto_id: number;     // Relación con la tabla Proyectos
    empleado_id: number;     // Relación con la tabla Empleados
    fecha_asignacion: Date;  // Fecha en la que el empleado fue asignado al proyecto
}
