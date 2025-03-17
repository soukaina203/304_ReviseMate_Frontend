import { Question } from 'app/models/Question';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatModule } from 'app/mat.modules';

@Component({
    selector: 'app-create-quiz',
    standalone: true,
    imports: [CommonModule, FormsModule, MatModule],
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateQuizComponent {
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    quizTitle = '';
    user: any;
    questions: any[] = [];
    PoppupContent: string = 'quiz sauvegardée avec succès'; // Contenu du message de la popup


    private uow: UowService = inject(UowService);
    private dialog = inject(MatDialog)
    private _router = inject(Router)


    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.addQuestion(); // Démarrer avec une question
    }

    addQuestion() {
        this.questions.push({
            id: '',
            question: '',
            allAnswers: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], // Quatre réponses possibles
            correct_answer: '', // Tableau vide au début
            id_quiz: '',
            incorrect_answers: []
        });
    }


    removeQuestion(index: number) {
        this.questions.splice(index, 1);
    }
    theCorrectAnswer(question, answer) {
        // Set the correct answer for the question
        question.correct_answer = answer.text;

        // Optional: You could log to check the correct answer has been set
        console.log(`La réponse correcte pour la question "${question.question}" est "${answer.text}"`);
    }

    submitQuiz() {
        event.preventDefault();

        // Ensure correct answer is set for each question before processing incorrect answers
        this.questions = this.questions.map(({ allAnswers, correct_answer, ...question }) => {
            if (!correct_answer || correct_answer.trim() === "") {
                console.warn(`Warning: No correct answer set for question: ${question.question}`);
            }

            // Ensure correct filtering
            const incorrect_answers = allAnswers
                .filter(answer => answer.text.trim() !== correct_answer.trim())
                .map(answer => answer.text);

            console.log("Processed Question:", question.question);
            console.log("Correct Answer:", correct_answer);
            console.log("Incorrect Answers:", incorrect_answers);

            return {
                ...question,
                correct_answer, // Ensure correct_answer is included in the final object
                incorrect_answers
            };
        });

        const quiz = {
            id: '',
            titre: this.quizTitle,
            id_utilisateur: this.user.id,
        };

        this.uow.quiz.post(quiz).subscribe((res: any) => {
            if (res.success) {
                this.questions.forEach(q => q.id_quiz = res.data._id);

                let requestsCompleted = 0;

                this.questions.forEach(question => {
                    this.uow.questions.post(question).subscribe({
                        next: (response) => {
                            console.log('Question créée:', response);
                            requestsCompleted++;
                            if (requestsCompleted === this.questions.length) {
                                this._router.navigateByUrl('/user/quiz'); // Navigate only after all requests complete
                            }
                        },
                        error: (err) => {
                            console.error('Erreur lors de la création de la question:', err);
                            this.PoppupContent = "Erreur lors de l'enregistrement du quiz";
                            this.InfoPoppup();
                        }
                    });
                });

            } else {
                this.PoppupContent = "Erreur lors de l'enregistrement du quiz";
                this.InfoPoppup();
            }
        });
    }



    InfoPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

}
