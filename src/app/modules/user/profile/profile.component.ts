import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from 'app/models/Role';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { Classe } from 'app/models/Classe';
import { MatModule } from 'app/mat.modules';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, CommonModule, MatSelectModule,
        FormsModule, ReactiveFormsModule,
        MatModule,


    ],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    id: any = 0;
    myForm: FormGroup;
    user: User = new User();
    roles: Role[] = []
    isProf: boolean = false;
    commingPwd = '';
    poppupMessage: string = ''
    isSuccess: boolean = false

    classes: Classe[] = [];
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    @ViewChild('DeletePoppup') DeletePoppup!: TemplateRef<any>;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private uow: UowService


    ) { }

    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1)
            this.id = userStorage.id
        }



        this.uow.users.getOne(this.id).subscribe((res: any) => {
            console.log(res)
            if (res.success) {
                this.user = res.data;
                this.commingPwd = res.data;
                this.user.id_role === 3 ? this.isProf = true : this.isProf = false;
                this.createForm();

            } else {
                this.DeletedUserPoppup()
            }
            this.uow.classes.getAll().subscribe((res: any) => {
                if (res !== null) {
                    this.classes = res.data
                } else {
                    console.log("a problem occur while fetching data")
                }
            })
        });

    }
    idClassValue(e) {
        console.log("===========")
        this.myForm.get('id_classe').setValue(e);
        console.log(e)

    }
    createForm() {
        this.myForm = this.fb.group({
            id: [this.id],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(7)]],
            id_role: [this.user.id_role],
            id_classe: [this.user.id_classe],
        });
    }

    choosenRole(id: number) {
        id === 3 ?
            this.isProf = true :
            this.isProf = false;
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    update(user) {

        if (user.password === '') {
            user.password = this.commingPwd
        }
        this.uow.users.put(this.id, user).subscribe((res) => {
            console.log(res)
            if (res.success) {
                this.poppupMessage = 'Profil mis à jour'
                this.ProfilePoppup()
                this.isSuccess = true
            } else {
                this.poppupMessage = "Erreur lors de la modification du profil"

                this.ProfilePoppup()
                this.isSuccess = false

            }
        })
    }

    closePoppup() {
        this.dialog.closeAll()
    }

    ProfilePoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    DeletedUserPoppup(): void {
        const dialogRef = this.dialog.open(this.DeletePoppup, {
            height: '300px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

}



