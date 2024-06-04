import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './components/mascota/mascota.component';
import { SeguraCrearComponent } from './components/mascota/segura-crear/segura-crear.component';
import { SeguraListarComponent } from './components/mascota/segura-listar/segura-listar.component';

const routes: Routes = [
  {
    path: 'mascota',
    component: MascotaComponent,
    children: [
      {
        path: 'segura/nuevo',
        component: SeguraCrearComponent,
      },
      {
        path: 'segura/listar',
        component: SeguraListarComponent,
      },
      {
        path: 'segura/edicion/:id',
        component: SeguraCrearComponent,
      },
      {
        path: '**',
        redirectTo: 'segura/listar',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'mascota',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
