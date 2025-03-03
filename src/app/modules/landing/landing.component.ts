import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,LandingHomeComponent,HeaderComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {

}
