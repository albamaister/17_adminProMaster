import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { URL_SERVICIOS } from '../../config/config';
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = true;


  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarHospitales());
          // esto se puede optimizar, recibir solo el hospital y actualizar ese en el arreglo de hospitales
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
          .subscribe( hospitales => {
            this.hospitales = hospitales;
            this.cargando = false;
          });

  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
          .subscribe();

  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital(hospital._id)
          .subscribe(() => this.cargarHospitales());

  }

  buscarHospital( termino: string ) {


    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHopital(termino)
          .subscribe(hospitales => {
            this.hospitales = hospitales;
            this.cargando = false;
          });
  }

  crearHospital() {
    swal({
      title: 'Create hospital',
      text: 'Enter the name of the hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
      if ( !valor || valor.length === 0 ) {
        return;
      }

      console.log(valor);

      this._hospitalService.crearHospital( valor )
            .subscribe( () => this.cargarHospitales() );

    } );
  }

  actualizarImagen(hospital: Hospital) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this._hospitalService.totalHospitales ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }


}
