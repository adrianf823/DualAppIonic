import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/guards/auth.guard';
const routes: Routes = [
  {
    path: 'datos-alumno/:id',
    loadChildren: () => import('./pages/datos-alumno/datos-alumno.module').then( m => m.DatosAlumnoPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'ciclos/:id',
    loadChildren: () => import('./pages/ciclos/ciclos.module').then( m => m.CiclosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'tutorempresa/:id',
    loadChildren: () => import('./pages/tutorempresa/tutorempresa.module').then( m => m.TutorempresaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profesores/:id',
    loadChildren: () => import('./pages/profesores/profesores.module').then( m => m.ProfesoresPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'alumnos/:id',
    loadChildren: () => import('./pages/alumnos/alumnos.module').then( m => m.AlumnosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'empresas/:id',
    loadChildren: () => import('./pages/empresas/empresas.module').then( m => m.EmpresasPageModule),
    canActivate:[AuthGuard]
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule),
    
  },
  { path: '**', redirectTo: 'login' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
 

  

  

 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
