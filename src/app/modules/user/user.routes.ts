import { Routes } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { FichesComponent } from "./fiches/fiches.component";
import { CartesComponent } from "./cartes/cartes.component";
import { TableauBordComponent } from "./tableau-bord/tableau-bord.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ImportationFilesComponent } from "./importation-files/importation-files.component";
import { PasserQuizComponent } from "./passer-quiz/passer-quiz.component";
import { ReviserCarteMemoireComponent } from "./reviser-carte-memoire/reviser-carte-memoire.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: TableauBordComponent },
            { path: 'import', component: ImportationFilesComponent },

            { path: 'quiz', children: [ { path: '', loadChildren: () => import('app/modules/user/quiz/quiz.routes') } ] },
            { path: 'fiches', children: [ { path: '', loadChildren: () => import('app/modules/user/fiches/fiches.routes') } ] },
            { path: 'cartes', children: [ { path: '', loadChildren: () => import('app/modules/user/cartes/cartes.routes') } ] },

            { path: 'profile', component: ProfileComponent },
            { path: 'passer-quiz/:id', component: PasserQuizComponent },
            { path: 'reviser-carte/:id', component: ReviserCarteMemoireComponent },




        ]
    }
] as Routes;
