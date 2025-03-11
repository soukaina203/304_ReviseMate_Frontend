import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';
import { Quiz } from 'app/models/Quiz';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

     private uow = inject(UowService)
       user: User = JSON.parse(localStorage.getItem("user"));

       quizs:Quiz[]=[]

       ngOnInit(): void {
           let user = JSON.parse(localStorage.getItem("user"))
           this.uow.quiz.getAll().subscribe((data:any) => {
               console.log(user.id)
               console.log(data)
               if (data !== null ) {

              this.quizs=data.filter((quiz:Quiz)=>quiz.id_utilisateur==user.id)
               }
               else {
                   console.log(
                       "No data fetched"
                   )
               }
           });
       }
}
