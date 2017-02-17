import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { ChartData } from './models';
import { ChartService } from './services';

@Injectable()
export class LineChartResolver implements Resolve<ChartData> {

  constructor(private chartService: ChartService) { }

  public resolve(route: ActivatedRouteSnapshot) {
    return this.chartService.getLineChartData(route.params['type'], route.params['system'], +route.params['month']);
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  LineChartResolver
];
