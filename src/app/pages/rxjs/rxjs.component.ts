import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;  

  constructor() {

    this.suscription = this.regresaObservable().subscribe(
      numero =>  console.log('Subs ', numero),
      error => console.error('Error en los obs ', error),
      () => console.log('El observador termino')
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.suscription.unsubscribe(); // cuando quiero cambiar de pagina y que deje de llamar al suscribe
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

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map( resp => {
        return resp.valor;
      } ), // este operador map recibe una funcion que permite transformar la data
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
        return true;
      })
    );

    return obs;
  }

}
