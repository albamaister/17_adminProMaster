import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins(); // de esta manera se puede llamar cualquier script que se encuentre fuera de
// angular en un archivo de javascript, esto funciona con plugins, carruseles,  tooltips

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

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

      console.log('Debe de aceptar las condiciones');
      return;

    }

    console.log(this.forma.value);
  }

}
