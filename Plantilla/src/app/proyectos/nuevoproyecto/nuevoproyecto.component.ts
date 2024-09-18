import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproyecto } from 'src/app/Interfaces/iproyectos';
import { ProyectosService } from 'src/app/Services/proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproyecto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproyecto.component.html',
  styleUrls: ['./nuevoproyecto.component.scss']
})
export class NuevoproyectoComponent implements OnInit {
  frm_Proyecto: FormGroup;
  idProyecto = 0;
  titulo = 'Nuevo Proyecto';

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private navegacion: Router,
    private proyectoServicio: ProyectosService
  ) {}

  ngOnInit(): void {
    this.frm_Proyecto = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required)
    });

    this.idProyecto = parseInt(this.ruta.snapshot.paramMap.get('id') || '0');
    if (this.idProyecto > 0) {
      this.crearFormulario();
    }
  }

  crearFormulario() {
    this.proyectoServicio.uno(this.idProyecto).subscribe((proyecto) => {
      this.frm_Proyecto.patchValue({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin
      });
    });
    this.titulo = 'Editar Proyecto';
  }

  grabar() {
    const proyecto: Iproyecto = {
      proyecto_id: this.idProyecto,
      nombre: this.frm_Proyecto.get('nombre')?.value,
      descripcion: this.frm_Proyecto.get('descripcion')?.value,
      fecha_inicio: this.frm_Proyecto.get('fecha_inicio')?.value,
      fecha_fin: this.frm_Proyecto.get('fecha_fin')?.value
    };

    if (this.idProyecto > 0) {
      this.proyectoServicio.actualizar(proyecto).subscribe((respuesta) => {
        Swal.fire('Proyectos', 'Proyecto actualizado.', 'success').then(() => {
          this.navegacion.navigate(['/proyectos']);
        });
      });
    } else {
      this.proyectoServicio.insertar(proyecto).subscribe((respuesta) => {
        Swal.fire('Proyectos', 'Proyecto grabado.', 'success').then(() => {
          this.navegacion.navigate(['/proyectos']);
        });
      });
    }
  }
}
