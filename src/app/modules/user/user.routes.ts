import { Routes } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { FichesComponent } from "./fiches/fiches.component";
import { CartesComponent } from "./cartes/cartes.component";
import { TableauBordComponent } from "./tableau-bord/tableau-bord.component";
import { HomeComponent } from "./home/home.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: TableauBordComponent },
            { path: 'quiz', component: QuizComponent },
            { path: 'fiches', component: FichesComponent },
            { path: 'cartes', component: CartesComponent },
        ]
    }
] as Routes;
