import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-quiz.component.html',
  styleUrl: './edit-quiz.component.scss'
})
export class EditQuizComponent {

     @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

        quizTitle = '';
        user: any;
        questions: any[] = [];
        PoppupContent: string = 'quiz sauvegardée avec succès'; // Contenu du message de la popup
        quiz;
        storedAnswers = []
        private uow: UowService = inject(UowService);
        private dialog = inject(MatDialog)
        private _router = inject(Router)
        private route = inject(ActivatedRoute)
        id!: string; // Stocker l'ID


        ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.uow.quiz.getOne(this.id).subscribe((res: any) => {
            if (res.data) {
                this.quizTitle=res.data.titre
                this.uow.questions.getQuizQuestions(this.id).subscribe((res)=>{
                    console.log(res)

                })
            }


         console.log(res)
        })

            // const state = history.state as {
            //     iaResponse: {
            //         data: { correctAnswer: string, wrongAnswers: string[], question: string }[];
            //         message: string;
            //         success: boolean;
            //     }
            // };
            // console.log(state)
            // if (state && state.iaResponse) {
            //     console.log('hello')

            //     state.iaResponse.data.forEach(element => {
            //         this.questions.push
            //             ({
            //                 id: '',
            //                 question: element.question,
            //                 allAnswers: [
            //                     ...element.wrongAnswers.map(answer => ({ text: answer })),
            //                     { text: element.correctAnswer }
            //                 ],
            //                 correct_answer: element.correctAnswer, // Tableau vide au début
            //                 id_quiz: '',
            //                 incorrect_answers: element.wrongAnswers

            //             })

            //     });
            // }
            // this.user = JSON.parse(localStorage.getItem("user"));
            // this.addQuestion(); // Démarrer avec une question
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
            if (this.quizTitle === '') {
                this.PoppupContent = "Veuillez renseigner le titre du quizs"
                this.InfoPoppup();
            } else {


                // Ensure correct answer is set for each question before processing incorrect answers
                this.questions = this.questions.map(({ allAnswers, correct_answer, ...question }) => {
                    if (!correct_answer || correct_answer.trim() === "") {
                        console.warn(`Warning: No correct answer set for question: ${question.question}`);
                    }
                    // Ensure correct filtering
                    const incorrect_answers = allAnswers
                        .filter(answer => answer?.text.trim() !== correct_answer.trim())
                        .map(answer => answer.text);


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
