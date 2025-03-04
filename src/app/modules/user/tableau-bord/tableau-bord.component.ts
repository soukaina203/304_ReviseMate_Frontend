import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-tableau-bord',
  standalone: true,
  imports: [CommonModule, HeaderComponent], 
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.scss']
})
export class TableauBordComponent {
}
