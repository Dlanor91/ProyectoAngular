import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnotacionesRequest } from 'src/app/interfaces/anotaciones_request';
import { ConsultasService } from 'src/app/servicios/consultas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;
  modalTitle?: string;
  anotaciones!: FormGroup;
  anotacionesContent = { titulo: '', descripcion: '' };
  constructor(private modalService: NgbModal, private router: Router, private consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.anotaciones = new FormGroup({
      titulo: new FormControl
        (
          this.anotacionesContent.titulo,
          [
            Validators.required,
            Validators.minLength(4)
          ]
        ),
      descripcion: new FormControl
        (

      ),
    });
  }
  get titulo() { return this.anotaciones.get('titulo')!; }
  get descripcion() { return this.anotaciones.get('descripcion')!; }
  abrir()
  {
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = "Crear nueva anotación";
  }
  
  enviar()
  {
    let modelo: AnotacionesRequest = { titulo: this.anotaciones.value.titulo, descripcion: this.anotaciones.value.descripcion };
    this.consultasService.addDatos(modelo).subscribe(
      {
        next:data=>
        {
          swal.fire({
            icon: 'success',
            timer: 5000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error:error=>
        {
          swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: "Se produjo un error, por favor vuelve a intentarlo"
          });
        }
      });      
    this.modalService.dismissAll();
  }

}
