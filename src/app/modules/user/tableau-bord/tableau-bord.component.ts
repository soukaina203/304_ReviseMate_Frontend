import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CartesComponent } from '../cartes/cartes.component';
import { FichesComponent } from '../fiches/fiches.component';
import { QuizComponent } from '../quiz/quiz.component';
import { RouterLink } from '@angular/router';
import { MatModule } from 'app/mat.modules';

@Component({
  selector: 'app-tableau-bord',
  standalone: true,
  imports: [CommonModule,RouterLink,MatModule],
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableauBordComponent {
     user = JSON.parse(localStorage.getItem("user"));
ngOnInit(): void {
    console.log(this.user)

}}
