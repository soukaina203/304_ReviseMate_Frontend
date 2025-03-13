import { Routes } from "@angular/router";
import { CreateCarteComponent } from "./create-carte/create-carte.component";
import { CartesComponent } from "./cartes.component";
import { EditCarteComponent } from "./edit-carte/edit-carte.component";

// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: 'create',
        component: CreateCarteComponent,

    },
    {

        path: '',
        component: CartesComponent,
    },
    {

        path: ':id',
        component: EditCarteComponent,
    }
] as Routes;
