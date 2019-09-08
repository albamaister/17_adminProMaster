import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/internal/operators/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
   }

   renuevaToken() {
     let url = URL_SERVICIOS + '/login/renuevatoken';
     url += '?token=' + this.token;
     return this.http.get(url)
       .pipe(
         map( (resp: any) => {
           this.token = resp.token;
           localStorage.setItem('token', this.token);
          //  console.log('token renovado');
           return true;
         } ),
         catchError(error => {
          this.router.navigate(['/login']);
          swal('Token could not be renewed', 'It was not possible to renew token', 'error');
          throw error;
        })
       );
   }

   estaLogeado() {
     return ( this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if ( localStorage.getItem('token') ) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }

   guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
   }

   logout() {
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');
     this.router.navigate(['/login']);
   }

   loginGoogle( token: string ) {
     let url = URL_SERVICIOS + '/login/google';
     return this.http.post(url, { token }).pipe(
       map( (resp: any) => {
         this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
         console.log(resp);
         return true;
       } ));
   }

   login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {

      localStorage.setItem('email', usuario.email);

    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        // console.log(resp);
        return true;
       }),
       catchError(error => {
        console.error('HTTP Error', error.status);
        swal('Error login', error.error.mensaje, 'error');
        throw error;
      })
    );

   }

  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
    .pipe(
          map( (resp: any) => {
            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          }),
          catchError(error => {
            console.error('HTTP Error', error.status);
            swal(error.error.mensaje, error.error.errors.message, 'error');
            throw error;
          })
    );

  }

  actualziarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario )
          .pipe( map ((resp: any) => {

            if ( usuario._id === this.usuario._id ) {
              let usuarioDB: Usuario = resp.usuario;
              this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
            }
            swal('User updated', usuario.nombre, 'success');
            return true;
            }),
            catchError(error => {
              console.error('HTTP Error', error.status);
              swal(error.error.mensaje, error.error.errors.message, 'error');
              throw error;
            })
          );
  }


  cambiarImagen( archivo: File, id: string ) {
     this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
       .then( (resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Image updated', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
       } ).catch( resp => {
         console.log(resp);
       } );
  }

  cargarUsuarios( desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) => resp.usuarios)
    );
  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map( resp => {
        swal('User Deleted', 'The user has been successfully deleted', 'success');
        return true;
      })
    );

  }

}
