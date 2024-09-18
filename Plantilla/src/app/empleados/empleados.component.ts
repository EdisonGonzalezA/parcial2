import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../Services/empleados.service';
import Swal from 'sweetalert2';
import { Iempleado } from '../Interfaces/iempleados';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit {
  listaEmpleados: Iempleado[] = [];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.empleadosService.todos().subscribe((data) => {
      this.listaEmpleados = data;
    });
  }

  eliminar(empleado_id: number) {
    Swal.fire({
      title: 'Empleados',
      text: '¿Está seguro que desea eliminar el empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Empleado'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadosService.eliminar(empleado_id).subscribe(() => {
          Swal.fire('Empleados', 'El empleado ha sido eliminado.', 'success');
          this.cargarTabla();
        });
      }
    });
  }
}
