import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  // Necesitamos obtener los parametros que definimos en el pages.routes.ts (data)
 // primero necesitamos importar el router en el constructor
  constructor( private router: Router, private title: Title, private meta: Meta ) {

    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );


      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag( metaTag );
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(

      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data )
    )
  }

}
