import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoComponent } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //aqui importo los servicios y el formulario  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //Editor Module
    EditorModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
