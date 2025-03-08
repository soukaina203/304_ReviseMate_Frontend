
// import { ProfileComponent } from "./profile/profile.component";

import { Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export default [
    { path: '', component: DashboardComponent }
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [
    //         // { path: 'users', component: UsersComponent },
    //         // { path: 'contenu', component: ContentComponent },
    //     ]
    // }
] as Routes;
