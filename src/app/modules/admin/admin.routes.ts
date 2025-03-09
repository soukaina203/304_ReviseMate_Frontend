
// import { ProfileComponent } from "./profile/profile.component";

import { Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";

export default [
    { path: '', component: DashboardComponent },
    {
        path: '',
        children: [
            { path: 'users',
                children: [
                    {path: '', loadChildren: () => import('app/modules/admin/users/users.routes')},
                ]   },
                { path: 'classes',
                    children: [
                        {path: '', loadChildren: () => import('app/modules/admin/classes/classes.routes')},
                    ]   },

            ]
        }
    ] as Routes;
