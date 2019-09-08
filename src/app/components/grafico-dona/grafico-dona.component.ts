import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  // tslint:disable-next-line: no-input-rename
  @Input('chartLabels') doughnutChartLabels: Label[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartType') doughnutChartType: ChartType = 'doughnut';

  @Input()  grafico: any[];

  constructor() { }

  ngOnInit() {





  }

 

}
