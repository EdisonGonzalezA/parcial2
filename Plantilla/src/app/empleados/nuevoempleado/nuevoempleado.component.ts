import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iempleado } from 'src/app/Interfaces/iempleados';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoempleado',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoempleado.component.html',
  styleUrls: ['./nuevoempleado.component.scss']
})
export class NuevoEmpleadoComponent implements OnInit {
  frm_Empleado: FormGroup;
  idEmpleado = 0;
  titulo = 'Nuevo Empleado';

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private navegacion: Router,
    private empleadoServicio: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.frm_Empleado = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      posicion: new FormControl('', Validators.required)
    });

    this.idEmpleado = parseInt(this.ruta.snapshot.paramMap.get('id') || '0');
    if (this.idEmpleado > 0) {
      this.crearFormulario();
    }
  }

  crearFormulario() {
    this.empleadoServicio.uno(this.idEmpleado).subscribe((empleado) => {
      this.frm_Empleado.patchValue({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        email: empleado.email,
        posicion: empleado.posicion
      });
    });
    this.titulo = 'Editar Empleado';
  }

  grabar() {
    const empleado: Iempleado = {
      empleado_id: this.idEmpleado,
      nombre: this.frm_Empleado.get('nombre')?.value,
      apellido: this.frm_Empleado.get('apellido')?.value,
      email: this.frm_Empleado.get('email')?.value,
      posicion: this.frm_Empleado.get('posicion')?.value
    };

    if (this.idEmpleado > 0) {
      this.empleadoServicio.actualizar(empleado).subscribe((respuesta) => {
        Swal.fire('Empleados', 'Empleado actualizado.', 'success').then(() => {
          this.navegacion.navigate(['/empleados']);
        });
      });
    } else {
      this.empleadoServicio.insertar(empleado).subscribe((respuesta) => {
        Swal.fire('Empleados', 'Empleado grabado.', 'success').then(() => {
          this.navegacion.navigate(['/empleados']);
        });
      });
    }
  }
}
