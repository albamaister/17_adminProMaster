import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {

    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'

  };

  // tslint:disable-next-line: variable-name // tslint:disable-next-line: deprecation
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
   }

  guardarAjuste() {

    // console.log('Guardado en el localstorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));

  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {

      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('cargando del localstorage');
      this.aplicarTema(this.ajustes.tema);

    } else {
      // console.log('Usando valores por defecto');
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema( tema: string ) {

    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );


    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjuste();
  }



}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

