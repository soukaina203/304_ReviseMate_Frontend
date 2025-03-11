import { Routes } from "@angular/router";
import { CreateFicheComponent } from "./create-fiche/create-fiche.component";
import { FichesComponent } from "./fiches.component";
import { EditFicheComponent } from "./edit-fiche/edit-fiche.component";

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
    },
    {
        path: ':id',
        component: EditFicheComponent,
    }
] as Routes;
