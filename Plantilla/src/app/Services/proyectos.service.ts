import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproyecto } from '../Interfaces/iproyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  apiurl = 'http://localhost/sexto/Evaluaciones/parcial2/back/controllers/proyectos.controller.php?op=';
  
  constructor(private lector: HttpClient) { }

  // Obtener todos los proyectos
  todos(): Observable<Iproyecto[]> {
    return this.lector.get<Iproyecto[]>(this.apiurl + 'todos');
  }

  // Obtener un proyecto por ID
  uno(proyecto_id: number): Observable<Iproyecto> {
    const formData = new FormData();
    formData.append('proyecto_id', proyecto_id.toString());
    return this.lector.post<Iproyecto>(this.apiurl + 'uno', formData);
  }

  // Insertar un nuevo proyecto
  insertar(proyecto: Iproyecto): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', proyecto.nombre);
    formData.append('descripcion', proyecto.descripcion);
    formData.append('fecha_inicio', proyecto.fecha_inicio instanceof Date ? proyecto.fecha_inicio.toISOString().split('T')[0] : proyecto.fecha_inicio);
    formData.append('fecha_fin', proyecto.fecha_fin instanceof Date ? proyecto.fecha_fin.toISOString().split('T')[0] : proyecto.fecha_fin);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar un proyecto existente
  actualizar(proyecto: Iproyecto): Observable<string> {
    const formData = new FormData();
    formData.append('proyecto_id', proyecto.proyecto_id.toString());
    formData.append('nombre', proyecto.nombre);
    formData.append('descripcion', proyecto.descripcion);
    formData.append('fecha_inicio', proyecto.fecha_inicio instanceof Date ? proyecto.fecha_inicio.toISOString().split('T')[0] : proyecto.fecha_inicio);
    formData.append('fecha_fin', proyecto.fecha_fin instanceof Date ? proyecto.fecha_fin.toISOString().split('T')[0] : proyecto.fecha_fin);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  // Eliminar un proyecto por ID
  eliminar(proyecto_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('proyecto_id', proyecto_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
}
