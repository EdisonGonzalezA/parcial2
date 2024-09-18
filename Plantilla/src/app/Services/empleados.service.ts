import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iempleado } from '../Interfaces/iempleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  apiurl = 'http://localhost/sexto/Evaluaciones/parcial2/back/controllers/empleados.controller.php?op=';
  
  constructor(private lector: HttpClient) { }

  // Obtener todos los empleados
  todos(): Observable<Iempleado[]> {
    return this.lector.get<Iempleado[]>(this.apiurl + 'todos');
  }

  // Obtener un empleado por ID
  uno(empleado_id: number): Observable<Iempleado> {
    const formData = new FormData();
    formData.append('empleado_id', empleado_id.toString());
    return this.lector.post<Iempleado>(this.apiurl + 'uno', formData);
  }

  // Insertar un nuevo empleado
  insertar(empleado: Iempleado): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', empleado.nombre);
    formData.append('apellido', empleado.apellido);
    formData.append('email', empleado.email);
    formData.append('posicion', empleado.posicion);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar un empleado existente
  actualizar(empleado: Iempleado): Observable<string> {
    const formData = new FormData();
    formData.append('empleado_id', empleado.empleado_id.toString());
    formData.append('nombre', empleado.nombre);
    formData.append('apellido', empleado.apellido);
    formData.append('email', empleado.email);
    formData.append('posicion', empleado.posicion);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  // Eliminar un empleado por ID
  eliminar(empleado_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('empleado_id', empleado_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
}
