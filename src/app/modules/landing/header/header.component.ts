import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.modules';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
