import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  @ViewChild('inputFile') myInputVariable: ElementRef;

  imagenSubir: File;

  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService ) {}

  ngOnInit() {
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( resp => {
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga...');
        });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.myInputVariable.nativeElement.value = '';
    this._modalUploadService.ocultarModal();
  }


  seleccionImagen( archivo: File ) {

    if (!archivo) {

      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Only images', 'The selected file is not an image', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }


}
