import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChartData } from '../models';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @HostBinding('class.content') public hostClass = 'content';
  public chartData: ChartData;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
      this.chartData = this.route.snapshot.data['chartData'];
  }
}
