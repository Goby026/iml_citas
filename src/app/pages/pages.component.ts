import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { PeritosComponent } from './peritos/peritos.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardComponent, PeritosComponent],
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent {

}
