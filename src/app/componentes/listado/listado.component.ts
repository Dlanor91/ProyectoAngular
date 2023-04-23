import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnotacionesResponse } from 'src/app/interfaces/anotaciones_response';
import { ConsultasService } from 'src/app/servicios/consultas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  datos?:Array<AnotacionesResponse>;
  constructor(private servicio: ConsultasService, private router: Router) { }

  ngOnInit(): void {
    this.hacerPeticion();
  }
  hacerPeticion()
  {
    this.servicio.getDatos().subscribe(
      {
        next:data=>
        {
          this.datos=data
        },
        error:error=>
        {
          console.error('Error', error);
        }
      });
  }
  eliminar(id:any)
  {
    swal.fire({
      title: '¿Realmente desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.deleteDatos(id).subscribe({
          next: data => {
            if (data.estado == 'ok') {
              swal.fire({
                icon: 'success',
                timer: 2000,
                title: 'OK',
                text: "Se eliminó el registro exitosamente"
              });
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            } else {
              swal.fire({
                icon: 'error',
                timer: 2000,
                title: 'Ups!',
                text: "No es posible eliminar el registro"
              });
            }
          },
          error: error => {

            console.error('Error', error);
          }
        });
      }
    });
  }

}
