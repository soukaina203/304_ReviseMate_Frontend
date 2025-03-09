

import { Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";
import { UsersComponent } from "./users.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { CreateUserComponent } from "./create-user/create-user.component";

export default [
    { path: '', component: UsersComponent },
    { path: 'edit/:id', component: EditUserComponent },
    { path: 'create', component: CreateUserComponent },

    ] as Routes;
