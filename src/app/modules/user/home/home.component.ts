import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauBordComponent } from '../tableau-bord/tableau-bord.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,TableauBordComponent,HeaderComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
