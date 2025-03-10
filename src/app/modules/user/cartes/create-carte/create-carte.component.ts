import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-carte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-carte.component.html',
  styleUrls: ['/create-carte.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCarteComponent {
// Liste des questions/réponses
questionAnswers = [{ question: '', answer: '' }];

// Fonction pour ajouter une nouvelle section de question/réponse
addQuestionAnswer() {
  this.questionAnswers.push({ question: '', answer: '' });
}
}
