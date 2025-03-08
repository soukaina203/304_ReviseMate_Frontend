import { Routes } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { FichesComponent } from "./fiches/fiches.component";
import { CartesComponent } from "./cartes/cartes.component";
import { TableauBordComponent } from "./tableau-bord/tableau-bord.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ImportationFilesComponent } from "./importation-files/importation-files.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: TableauBordComponent },
            { path: 'import', component: ImportationFilesComponent },
            { path: 'quiz', component: QuizComponent },
            { path: 'fiches', component: FichesComponent },
            { path: 'cartes', component: CartesComponent },
            { path: 'profile', component: ProfileComponent },




        ]
    }
] as Routes;
