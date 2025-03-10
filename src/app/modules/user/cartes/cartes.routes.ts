import { Routes } from "@angular/router";
import { CreateCarteComponent } from "./create-carte/create-carte.component";
import { CartesComponent } from "./cartes.component";

// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path: 'create',
        component: CreateCarteComponent,

    },
    {

        path: '',
        component: CartesComponent,
    }
] as Routes;
