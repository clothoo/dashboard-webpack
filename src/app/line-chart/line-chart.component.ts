import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ChartData } from '../models';
import { ChartService } from '../services';
import { GlobalVariable } from '../helpers';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @HostBinding('class.content') public hostClass = 'content';
  public chartData: ChartData;
  private selectedMonth: number;
  private selectedType: string;
  private selectedSystem: string;

  constructor(private route: ActivatedRoute, private chartService: ChartService, private router: Router) {}

  public ngOnInit(): void {
      this.selectedType = this.route.snapshot.params['type'];
      this.selectedSystem = this.route.snapshot.params['system'];
      this.selectedMonth = +this.route.snapshot.params['month'];
      this.chartData = this.route.snapshot.data['chartData'];
  }

  get months() {
    return GlobalVariable.month;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
}
