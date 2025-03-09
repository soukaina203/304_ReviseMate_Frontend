

import { Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";
import { ClassesComponent } from "./classes.component";
import { EditClasseComponent } from "./edit-classe/edit-classe.component";
import { CreateClasseComponent } from "./create-classe/create-classe.component";

export default [
    { path: '', component: ClassesComponent },
    { path: 'edit/:id', component: EditClasseComponent },
    { path: 'create', component: CreateClasseComponent },

    ] as Routes;
