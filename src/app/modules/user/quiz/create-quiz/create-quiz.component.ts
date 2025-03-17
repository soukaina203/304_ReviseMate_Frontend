import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-quiz',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateQuizComponent {
    quizTitle = '';
    user: any;
    questions: any[] = [];
    uow: UowService = inject(UowService);

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.addQuestion(); // Démarrer avec une question
    }

    addQuestion() {
        this.questions.push({
            id: '',
            question: '',
            allAnswers: [{text:''}, {text:''},{text:''},{text:''}], // Quatre réponses possibles
            correct_answer: '', // Tableau vide au début
            id_quiz: ''
        });
    }


    removeQuestion(index: number) {
        this.questions.splice(index, 1);
    }

    // submitQuiz() {
    //     event.preventDefault();
    //     const quiz = {
    //         id: '',
    //         titre: this.quizTitle,
    //         id_utilisateur: this.user.id,
    //     };

    //     this.uow.quiz.post(quiz).subscribe((createdQuiz) => {
    //         console.log('Quiz créé:', createdQuiz);

    //         // Associer l'ID du quiz aux questions
    //         this.questions.forEach(q => q.id_quiz = createdQuiz.id);

    //         // Envoyer les questions au backend
    //         this.questions.forEach(question => {
    //             this.uow.questions.post(question).subscribe(response => {
    //                 console.log('Question créée:', response);
    //             });
    //         });
    //     });
    // }
}
