import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { SeguraCrearComponent } from './components/mascota/segura-crear/segura-crear.component';
import { SeguraListarComponent } from './components/mascota/segura-listar/segura-listar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SeguraEliminarComponent } from './components/mascota/segura-eliminar/segura-eliminar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MascotaComponent,
    SeguraCrearComponent,
    SeguraListarComponent,
    SeguraEliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
