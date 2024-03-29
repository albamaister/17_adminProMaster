import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                console.log(resp);
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
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

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.cargando = false;
        });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ) {

      swal('Cannot delete user', 'You cannot delete yourself', 'error');
      return;

    }
    swal({
      title: 'Are you sure?',
      text: 'You are about to erase ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);
      if (borrar) {

        this._usuarioService.borrarUsuario( usuario._id )
                  .subscribe( borrado => {
                    console.log(borrado);
                    this.cargarUsuarios();
                  });

      }
    });

  }

  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualziarUsuario(usuario).subscribe();

  }

}
