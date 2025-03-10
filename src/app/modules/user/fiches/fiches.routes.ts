import { Routes } from "@angular/router";
import { CreateFicheComponent } from "./create-fiche/create-fiche.component";
import { FichesComponent } from "./fiches.component";

// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: '',
        component: FichesComponent,
    }
    ,
    {
        path: 'create',
        component: CreateFicheComponent,
    }
] as Routes;
