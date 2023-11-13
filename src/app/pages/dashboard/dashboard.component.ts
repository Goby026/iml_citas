import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from '../../shared/aside/aside.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsideComponent, HeaderComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
