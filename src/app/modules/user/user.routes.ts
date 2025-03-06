import { Routes } from "@angular/router";
import { TableauBordComponent } from "./tableau-bord/tableau-bord.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [
    {
        path     : '',
        component: TableauBordComponent,
    },
    // {
    //     path     : 'profile',
    //     component: ProfileComponent,
    // },

] as Routes;
