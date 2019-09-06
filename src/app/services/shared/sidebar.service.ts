import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //     titulo: 'Pricipal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Dashboard', url: '/dashboard'},
  //       {titulo: 'ProgressBar', url: '/progress'},
  //       {titulo: 'Gráficas', url: '/graficas1'},
  //       {titulo: 'Promesas', url: '/promesas'},
  //       {titulo: 'Rxjs', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Maintenance',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Users', url: '/usuarios' },
  //       { titulo: 'Hospitals', url: '/hospitales' },
  //       { titulo: 'Doctors', url: '/medicos' }
  //     ]
  //   }


  // ];

  constructor( public _usuarioService: UsuarioService ) {

    this.menu = this._usuarioService.menu;
   }

   cargarMenu() {
    this.menu = this._usuarioService.menu;
   }
}
