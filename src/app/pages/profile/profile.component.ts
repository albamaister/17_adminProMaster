import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualziarUsuario( this.usuario )
            .subscribe( resp => {
              console.log(resp);
            } );
  }

}
