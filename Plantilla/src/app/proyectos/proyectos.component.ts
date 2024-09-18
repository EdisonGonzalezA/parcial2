import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../Services/proyectos.service';
import Swal from 'sweetalert2';
import { Iproyecto } from '../Interfaces/iproyectos';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  listaProyectos: Iproyecto[] = [];
  
  constructor(private proyectosService: ProyectosService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.proyectosService.todos().subscribe((data) => {
      this.listaProyectos = data;
    });
  }

  eliminar(proyecto_id: number) {
    Swal.fire({
      title: 'Proyectos',
      text: '¿Está seguro que desea eliminar el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Proyecto'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectosService.eliminar(proyecto_id).subscribe(() => {
          Swal.fire('Proyectos', 'El proyecto ha sido eliminado.', 'success');
          this.cargarTabla();
        });
      }
    });
  }
}
