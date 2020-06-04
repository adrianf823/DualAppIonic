import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/services/auth.guard';
const routes: Routes = [
  
  {
    path: 'profesores/:lugar/:id',
    loadChildren: () => import('./pages/profesores/profesores.module').then( m => m.ProfesoresPageModule),
 
  },
  {
    path: 'empresas/:id',
    loadChildren: () => import('./pages/empresas/empresas.module').then( m => m.EmpresasPageModule),
    
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule),
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
