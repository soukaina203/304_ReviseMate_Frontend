import { Routes } from "@angular/router";

import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: 'create',
        component: CreateQuizComponent,

    }
] as Routes;
