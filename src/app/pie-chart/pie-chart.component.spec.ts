/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { ChartData } from '../models';
import { ChartService } from '../services';
import { PieChartComponent } from './pie-chart.component';

import 'chart.js';

class MockChartService extends ChartService {
  public getPieChartData(system: string, month: number): Observable<ChartData> {
    if (system === 'service') {
      return Observable.of({ labels: [ 'RT' ], data: [ 234 ]});
    } else {
      return Observable.throw('No usage');
    }
  }
}

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ChartsModule, MaterialModule.forRoot(), RouterTestingModule ],
      declarations: [ PieChartComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{ provide: ChartService, useClass: MockChartService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
  });

  it('should create with no data', async(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.selectedMonth).toBe(new Date().getUTCMonth());
    expect(component.chartData).toEqual(undefined);
    expect(component.errorMessage).toEqual('No usage');
  }));

  it('should create with data (fakeAsync)', fakeAsync(() => {
    component = fixture.componentInstance;
    component.system = 'service';
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.selectedMonth).toBe(new Date().getUTCMonth());
    tick();
    fixture.detectChanges();
    expect(component.chartData.labels).toEqual([ 'RT' ]);
    expect(component.chartData.data).toEqual([ 234 ]);
    expect(component.errorMessage).toEqual(undefined);
  }));

  it('should goto line chart when clicked', async(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el).not.toBeNull();
    de.triggerEventHandler('click', null);
  }));
});
