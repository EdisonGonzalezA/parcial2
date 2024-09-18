import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iasignacion } from 'src/app/Interfaces/iasignaciones';
import { Iempleado } from 'src/app/Interfaces/iempleados';
import { Iproyecto } from 'src/app/Interfaces/iproyectos';
import { AsignacionesService } from 'src/app/Services/asignaciones.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ProyectosService } from 'src/app/Services/proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaasignacion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevaasignacion.component.html',
  styleUrls: ['./nuevaasignacion.component.scss']
})
export class NuevaAsignacionComponent implements OnInit {
  frm_Asignacion: FormGroup;
  idAsignacion = 0;
  titulo = 'Nueva Asignación';
  listaProyectos: Iproyecto[] = [];
  listaEmpleados: Iempleado[] = [];

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private navegacion: Router,
    private asignacionServicio: AsignacionesService,
    private proyectosService: ProyectosService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.frm_Asignacion = new FormGroup({
      proyecto_id: new FormControl('', Validators.required),
      empleado_id: new FormControl('', Validators.required),
      fecha_asignacion: new FormControl('', Validators.required)
    });

    // Cargar proyectos y empleados desde la base de datos
    this.proyectosService.todos().subscribe((data) => {
      this.listaProyectos = data;
    });

    this.empleadosService.todos().subscribe((data) => {
      this.listaEmpleados = data;
    });

    this.idAsignacion = parseInt(this.ruta.snapshot.paramMap.get('id') || '0');
    if (this.idAsignacion > 0) {
      this.crearFormulario();
    }
  }

  crearFormulario() {
    this.asignacionServicio.uno(this.idAsignacion).subscribe((asignacion) => {
      this.frm_Asignacion.patchValue({
        proyecto_id: asignacion.proyecto_id,
        empleado_id: asignacion.empleado_id,
        fecha_asignacion: asignacion.fecha_asignacion
      });
    });
    this.titulo = 'Editar Asignación';
  }

  grabar() {
    const asignacion: Iasignacion = {
      asignacion_id: this.idAsignacion,
      proyecto_id: this.frm_Asignacion.get('proyecto_id')?.value,
      empleado_id: this.frm_Asignacion.get('empleado_id')?.value,
      fecha_asignacion: this.frm_Asignacion.get('fecha_asignacion')?.value
    };

    if (this.idAsignacion > 0) {
      this.asignacionServicio.actualizar(asignacion).subscribe((respuesta) => {
        Swal.fire('Asignaciones', 'Asignación actualizada.', 'success').then(() => {
          this.navegacion.navigate(['/asignaciones']);
        });
      });
    } else {
      this.asignacionServicio.insertar(asignacion).subscribe((respuesta) => {
        Swal.fire('Asignaciones', 'Asignación grabada.', 'success').then(() => {
          this.navegacion.navigate(['/asignaciones']);
        });
      });
    }
  }
}
