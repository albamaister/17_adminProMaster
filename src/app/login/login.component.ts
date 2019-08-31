import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(); // de esta manera se puede llamar cualquier script que se encuentre fuera de
// angular en un archivo de javascript, esto funciona con plugins, carruseles,  tooltips

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '880925857002-298q36627seve6u0t9v7691j00o88ect.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );


    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log( token );
    });
  }

  ingresar( forma: NgForm ) {
    // this.router.navigate(['/dashboard']);

    if ( forma.invalid ) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login( usuario, forma.value.recuerdame )
                    .subscribe( resp => {
                      this.router.navigate(['/dashboard']);
                    });

  }

}
