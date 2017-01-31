import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartData } from '../models';
import { ChartService } from '../services';
import { GlobalVariable } from '../helpers';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() public system: string;
  public chartData: ChartData;
  public errorMessage: string;
  public selectedMonth: number;

  constructor(private chartService: ChartService, private router: Router) {}

  public ngOnInit(): void {
    this.selectedMonth = new Date().getUTCMonth();
    this.changeMonth(this.selectedMonth);
  }

  get months() {
    return GlobalVariable.month;
  }

  public changeMonth(e: number): void {
    this.selectedMonth = e;
    this.chartService.getPieChartData(this.system, this.selectedMonth).subscribe(
        (response) => {
            this.chartData = response;
            this.errorMessage = undefined;
        },
        (error) => {
            this.errorMessage = <any> error;
            this.chartData = undefined;
        });
  }

  public chartClicked(e: any): void {
    let label = this.chartData.labels[e.active[0]._index];
    this.router.navigate(['/lineChart', label, this.system, this.selectedMonth]);
  }

  public chartHovered(e: any): void {
    // e.active["0"]._chart.canvas.style.cursor = 'pointer';
  }
}
