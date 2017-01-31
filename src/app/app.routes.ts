import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard';
import { LineChartComponent } from './line-chart';
import { NoContentComponent } from './no-content';
import { PieChartComponent } from './pie-chart';

import { LineChartResolver } from './line-chart.resolver';

export const ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'lineChart/:type/:system/:month',
    component: LineChartComponent,
    resolve: {
      chartData: LineChartResolver
    }
  },
  { path: '**',    component: NoContentComponent },
];
