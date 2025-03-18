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
    isFromIa = false;
    user: any;
    questions: any[] = [];
    PoppupContent: string = 'Quiz sauvegardé avec succès';
    quiz;

    private uow: UowService = inject(UowService);
    private dialog = inject(MatDialog);
    private _router = inject(Router);

    ngOnInit() {
        const state = history.state as {
            iaResponse?: {
                data: { correctAnswer: string, wrongAnswers: string[], question: string }[];
                message: string;
                success: boolean;
            }
        };

        if (state?.iaResponse) {
            this.isFromIa = true;
            state.iaResponse.data.forEach(element => {
                this.questions.push({
                    id: '',
                    question: element.question,
                    allAnswers: [
                        ...element.wrongAnswers.map(answer => ({ text: answer, isChecked: false })),
                        { text: element.correctAnswer, isChecked: true }
                    ],
                    correct_answer: element.correctAnswer,
                    id_quiz: '',
                    incorrect_answers: element.wrongAnswers
                });
            });
        } else {
            this.isFromIa = false;
            this.addQuestionReponse(); // Démarrer avec une question
        }

        this.user = JSON.parse(localStorage.getItem("user"));
    }

    addQuestionReponse() {
        this.questions.push({
            id: '',
            question: '',
            allAnswers: [
                { text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false }
            ],
            correct_answer: '',
            id_quiz: '',
            incorrect_answers: []
        });
    }

    removeQuestion(index: number) {
        this.questions.splice(index, 1);
    }

    theCorrectAnswer(question, selectedAnswer) {
        question.allAnswers.forEach(answer => {
            answer.isChecked = (answer === selectedAnswer);
        });

        question.correct_answer = selectedAnswer.text;

        console.log(`Réponse correcte pour la question "${question.question}": "${selectedAnswer.text}"`);
    }

    submitQuiz() {
        event.preventDefault();
        if (this.quizTitle.trim() === '') {
            this.PoppupContent = "Veuillez renseigner le titre du quiz";
            this.InfoPoppup();
            return;
        }

        this.questions = this.questions.map(({ allAnswers, correct_answer, ...question }) => {
            if (!correct_answer.trim()) {
                console.warn(`Aucune réponse correcte définie pour la question : ${question.question}`);
            }

            const incorrect_answers = allAnswers
                .filter(answer => answer.text.trim() !== correct_answer.trim())
                .map(answer => answer.text);

            return { ...question, correct_answer, incorrect_answers };
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
                    this.uow.question.post(question).subscribe({
                        next: (response) => {
                            console.log('Question créée:', response);
                            requestsCompleted++;
                            if (requestsCompleted === this.questions.length) {
                                this._router.navigateByUrl('/user/quiz');
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
        this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
    }
}
