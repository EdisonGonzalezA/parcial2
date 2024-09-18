import { Component, OnInit } from '@angular/core';
import { AsignacionesService } from '../Services/asignaciones.service';
import Swal from 'sweetalert2';
import { Iasignacion } from '../Interfaces/iasignaciones';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';

import { HttpClient } from '@angular/common/http';  // Importar para hacer la solicitud del PDF

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.scss'
})
export class AsignacionesComponent implements OnInit {
  listaAsignaciones: Iasignacion[] = [];

  constructor(
    private asignacionesService: AsignacionesService,
    private http: HttpClient // Para hacer la solicitud al backend
  ) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.asignacionesService.todos().subscribe((data) => {
      this.listaAsignaciones = data;
    });
  }

  eliminar(asignacion_id: number) {
    Swal.fire({
      title: 'Asignaciones',
      text: '¿Está seguro que desea eliminar la asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Asignación'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionesService.eliminar(asignacion_id).subscribe(() => {
          Swal.fire('Asignaciones', 'La asignación ha sido eliminada.', 'success');
          this.cargarTabla();
        });
      }
    });
  }

  generarPDF() {
    this.http.get('http://localhost/sexto/Evaluaciones/parcial2/back/reports/generar_reporte.php', { responseType: 'blob' }).subscribe((response) => {
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');
    });
  }
}