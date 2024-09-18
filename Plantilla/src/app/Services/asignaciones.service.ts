import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iasignacion } from '../Interfaces/iasignaciones';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  apiurl = 'http://localhost/sexto/Evaluaciones/parcial2/back/controllers/asignaciones.controller.php?op=';

  constructor(private lector: HttpClient) { }

  // Obtener todas las asignaciones
  todos(): Observable<Iasignacion[]> {
    return this.lector.get<Iasignacion[]>(this.apiurl + 'todos');
  }

  // Obtener una asignación por ID
  uno(asignacion_id: number): Observable<Iasignacion> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion_id.toString());
    return this.lector.post<Iasignacion>(this.apiurl + 'uno', formData);
  }

  // Insertar una nueva asignación
  insertar(asignacion: Iasignacion): Observable<string> {
    const formData = new FormData();
    formData.append('proyecto_id', asignacion.proyecto_id.toString());
    formData.append('empleado_id', asignacion.empleado_id.toString());
    formData.append('fecha_asignacion', asignacion.fecha_asignacion instanceof Date ? asignacion.fecha_asignacion.toISOString().split('T')[0] : asignacion.fecha_asignacion);
    
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar una asignación existente
  actualizar(asignacion: Iasignacion): Observable<string> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion.asignacion_id!.toString());  // ID ya no es opcional en este caso
    formData.append('proyecto_id', asignacion.proyecto_id.toString());
    formData.append('empleado_id', asignacion.empleado_id.toString());
    formData.append('fecha_asignacion', asignacion.fecha_asignacion instanceof Date ? asignacion.fecha_asignacion.toISOString().split('T')[0] : asignacion.fecha_asignacion);
    
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  // Eliminar una asignación por ID
  eliminar(asignacion_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('asignacion_id', asignacion_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
}
