import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';
import { Quiz } from 'app/models/Quiz';
import { RouterLink } from '@angular/router';
import { MatModule } from 'app/mat.modules';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CommonModule,MatModule, RouterLink],
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuizComponent {

    private uow = inject(UowService)
    user: User = JSON.parse(localStorage.getItem("user"));
    message: string = '';

    quizs:Quiz[]=[]

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"))
        this.uow.quiz.getAll().subscribe((res:any) => {

            if (res.success) {
                if (res.data.length == 0) {
                    this.message = "Aucune fiche trouvée";
                } else {
                    this.quizs = res.data.filter((quiz: Quiz) => quiz.id_utilisateur == user?.id)
                }
            } else {
                console.log("No data fetched");
            }
        },
        (error: any) => {
            console.error("Error fetching data", error);
        }
    );
}
deleteQuiz(id: number) {
    this.uow.quiz.delete(id).subscribe((res) => {
        console.log(res)
        this.ngOnInit();
    });
}
}
