/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ChartService } from '../services';
import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ChartsModule, MaterialModule.forRoot(), RouterTestingModule ],
      declarations: [ LineChartComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ ChartService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hostClass', () => {
    expect(component.hostClass).not.toBeNull();
  });
});
