import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './shared/aside/aside.component';
import { HeaderComponent } from './shared/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsideComponent, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'umlselvacentral';
}
