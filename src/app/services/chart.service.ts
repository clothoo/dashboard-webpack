import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ChartData, Data, Stats, Usage } from '../models';

@Injectable()
export class ChartService {
  private noUsageMessage = 'No usage';

  constructor(private http: Http) {}

  public getPieChartData(system: string, month: number): Observable<ChartData> {
      return this.getUsages().map((usages) => {
        let selectedData: Data[] = usages.filter((u) => system === u.name).map((u) => u.data).reduce((a, b) => a.concat(b));
        let chartLabels: string[] = selectedData.map((d) => d.type);
        let chartData: number[] = [];
        for (let label of chartLabels) {
          let selectedMonthStats: Stats[] = selectedData.filter((d) => d.type === label).map((d) => d.stats).reduce((a, b) => a.concat(b))
            .filter((s) => (new Date(s.date)).getUTCMonth() === month);
          if (typeof selectedMonthStats !== 'undefined' && selectedMonthStats.length > 0) {
            let count = selectedMonthStats.map((s) => s.count).reduce((a, b) => a + b);
            chartData.push(count);
          } else {
            throw new Error(this.noUsageMessage);
          }
        }
        return { labels: chartLabels, data: chartData };
      }).catch(this.handleError);
  }

  public getLineChartData(type: string, system: string, month: number): Observable<ChartData> {
      return this.getUsages().map((usages) => {
        let selectedData: Data[] = usages.filter((u) => system === u.name).map((u) => u.data).reduce((a, b) => a.concat(b));
        let selectedMonthStats: Stats[] = selectedData.filter((d) => d.type === type).map((d) => d.stats).reduce((a, b) => a.concat(b))
          .filter((s) => (new Date(s.date)).getUTCMonth() === month);
        if (typeof selectedMonthStats !== 'undefined' && selectedMonthStats.length > 0) {
          let chartLabels: string[] = selectedMonthStats.map((s) => s.date);
          let chartData = selectedMonthStats.map((s) => s.count);
          return { labels: chartLabels, data: [{ data: chartData, label: type }] };
        } else {
          throw new Error(this.noUsageMessage);
        }
      }).catch(this.handleError);
  }

  private getUsages(): Observable<Usage[]> {
    return this.http.get('/assets/mock-data/usages.json')
        .map((response) => <Usage[]> response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
