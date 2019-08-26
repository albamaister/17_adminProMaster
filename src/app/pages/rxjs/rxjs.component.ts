import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable().subscribe(
      numero =>  console.log('Subs ', numero),
      error => console.error('Error en los obs ', error),
      () => console.log('El observador termino')
    );
   }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    let obs = new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        
        const salida = {
          valor: contador
        };
        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map( resp => {
        return resp.valor;
      } ) // este operador map recibe una funcion que permite transformar la data
    );

    return obs;
  }

}
