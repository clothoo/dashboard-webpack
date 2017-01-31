import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  @HostBinding('class.content') public hostClass = 'content';
}
