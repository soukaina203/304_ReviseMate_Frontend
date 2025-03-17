import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { ScoreService } from 'app/services/score.service'; // Importez ScoreService
import { User } from 'app/models/User';
import { Quiz } from 'app/models/Quiz';
import { RouterLink } from '@angular/router';
import { MatModule } from 'app/mat.modules';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {
  private uow = inject(UowService);
  private scoreService = inject(ScoreService); // Injectez ScoreService
  user: User = JSON.parse(localStorage.getItem("user"));
  message: string = '';
  quizs: Quiz[] = [];

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user"));
    this.uow.quiz.getAll().subscribe((res: any) => {
      if (res.success) {
        if (res.data.length === 0) {
          this.message = "Aucune fiche trouvée";
        } else {
          this.quizs = res.data.filter((quiz: Quiz) => quiz.id_utilisateur === user?.id);
          this.loadScores();
        }
      } else {
        console.log("No data fetched");
      }
    },
    (error: any) => {
      console.error("Error fetching data", error);
    });
  }

  //Afficher le score
  loadScores() {
    this.quizs.forEach((quiz) => {
      this.scoreService.getQuizScores(quiz._id).subscribe((scores: any) => {
        if (scores && scores.length > 0) {
          const latestScore = scores[scores.length - 1];
          quiz.correctAnswers = latestScore.correctAnswers;
          quiz.totalQuestions = latestScore.totalQuestions;
          quiz.date_score = latestScore.date;
        }
      });
    });
  }

  //Supprimer le quiz
    deleteQuiz(id: string) {
    this.uow.quiz.delete(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });
  }
}
