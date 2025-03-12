import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateQuizComponent {
  // Tableau de questions
  questions = [];

  ngOnInit() {
    // Initialiser avec une question par défaut
    this.addQuestion();
  }
  // Ajouter une question
  addQuestion() {
    this.questions.push({
      text: '',
      answers: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      correctAnswer: null
    });
  }
}
