import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }


  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre})
          .pipe(
            map((resp: any) => resp.hospital)
          );

  }

  cargarHospitales( desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url )
        .pipe(
          map((resp: any) => {{
            this.totalHospitales = resp.total;
            return resp.hospitales;
          }})
        );
  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
            .pipe(
              map( (resp: any) => resp.hospital )
            );

  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
          .pipe(
            map(resp => swal('Hospital deleted', 'Successfully removed', 'success'))
          );
  }

  buscarHopital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospitales)
    );
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
          .pipe(
            map((resp: any) => {
              swal('Hospital updated', hospital.nombre, 'success');
              return resp.hospital;
            })
          );

  }

}
