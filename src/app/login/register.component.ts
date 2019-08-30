import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins(); // de esta manera se puede llamar cualquier script que se encuentre fuera de
// angular en un archivo de javascript, esto funciona con plugins, carruseles,  tooltips

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( group: FormGroup ) {

    return group.get('password').value === group.get('password2').value
    ? null : {'sonIguales': true};

  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales});

    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante!', 'Debe de aceptar las condiciones!', 'warning');
      return;

    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
  );

    this._usuarioService.crearUsuario(usuario)
      .subscribe( resp => {
        this.router.navigate(['/login']);
      } );

  }

}
