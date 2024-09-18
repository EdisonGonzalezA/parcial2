// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./proveedores/proveedores.component').then((m) => m.ProveedoresComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarcliente/:idCliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'facturas',
        loadComponent: () => import('./facturas/facturas.component').then((m) => m.FacturasComponent)
      },
      {
        path: 'nuevafactura',
        loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarfactura/:id',
        loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent)
      },
      {
        path: 'unidadmedida',
        loadComponent: () => import('./unidadmedida/unidadmedida.component').then((m) => m.UnidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevaunidadmedida',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarunidadmedida/:id',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'productos',
        loadComponent: () => import('./productos/productos.component').then((m) => m.ProductosComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoproducto',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproducto/:id',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'iva',
        loadComponent: () => import('./iva/iva.component').then((m) => m.IvaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoiva',
        loadComponent: () => import('./iva/nuevoiva/nuevoiva.component').then((m) => m.NuevoivaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editariva/:id',
        loadComponent: () => import('./iva/nuevoiva/nuevoiva.component').then((m) => m.NuevoivaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./proyectos/proyectos.component').then((m) => m.ProyectosComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoproyecto',
        loadComponent: () => import('./proyectos/nuevoproyecto/nuevoproyecto.component').then((m) => m.NuevoproyectoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproyecto/:id',
        loadComponent: () => import('./proyectos/nuevoproyecto/nuevoproyecto.component').then((m) => m.NuevoproyectoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'empleados',
        loadComponent: () => import('./empleados/empleados.component').then((m) => m.EmpleadosComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoempleado',
        loadComponent: () => import('./empleados/nuevoempleado/nuevoempleado.component').then((m) => m.NuevoEmpleadoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarempleado/:id',
        loadComponent: () => import('./empleados/nuevoempleado/nuevoempleado.component').then((m) => m.NuevoEmpleadoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'asignaciones',
        loadComponent: () => import('./asignaciones/asignaciones.component').then((m) => m.AsignacionesComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevaasignacion',
        loadComponent: () => import('./asignaciones/nuevaasignacion/nuevaasignacion.component').then((m) => m.NuevaAsignacionComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarasignacion/:id',
        loadComponent: () => import('./asignaciones/nuevaasignacion/nuevaasignacion.component').then((m) => m.NuevaAsignacionComponent),
        canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
