import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  constructor( public _usuaruiService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuaruiService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                console.log(resp);
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
              });

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

}
