import { Component, OnInit } from '@angular/core';
declare function init_plugins(); // de esta manera se puede llamar cualquier script que se encuentre fuera de
// angular en un archivo de javascript, esto funciona con plugins, carruseles,  tooltips

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
