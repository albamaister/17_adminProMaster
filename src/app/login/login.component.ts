import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins(); // de esta manera se puede llamar cualquier script que se encuentre fuera de
// angular en un archivo de javascript, esto funciona con plugins, carruseles,  tooltips

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate(['/dashboard']);
  }

}
