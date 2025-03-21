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
import { UserUpdateService } from '../../../services/update-user.service'; // Import du service

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, CommonModule, MatSelectModule,
        FormsModule, ReactiveFormsModule,
        MatModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    id: any = 0;
    myForm: FormGroup;
    user: User = new User();
    isProf: boolean = false;
    commingPwd = '';
    poppupMessage: string = ''
    isSuccess: boolean = false;
    role: string;
    classes: Classe[] = [];

    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    @ViewChild('DeletePoppup') DeletePoppup!: TemplateRef<any>;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private uow: UowService,
        private userUpdateService: UserUpdateService // Injection du service
    ) { }

    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1)
            this.id = userStorage.id
        }

        this.uow.users.getOne(this.id).subscribe((res: any) => {
            console.log(res);
            if (res.success) {
                this.user = res.data;
                this.commingPwd = res.data.password;
                this.role = this.user.role;
                this.createForm();
            } else {
                this.DeletedUserPoppup();
            }
            this.uow.classes.getAll().subscribe((res: any) => {
                if (res !== null) {
                    this.classes = res.data;
                } else {
                    console.log("A problem occurred while fetching data");
                }
            });
        });
    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.id],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(.{8,})$/)]],
            role: [this.user.role],
            id_classe: [this.user.id_classe],
        });
    }
    

    update(user) {
        // Vérifiez si le mot de passe a été modifié
        if (user.password === '') {
            // Supprimez le champ password des données envoyées
            delete user.password;
        } else {
            // Mettez à jour le mot de passe
            user.password = this.commingPwd;
        }
    
        // Utilisation du service UserUpdateService pour mettre à jour l'utilisateur
        this.userUpdateService.updateUser(this.id, user).subscribe((res: { success: boolean, data: any }) => {
            console.log('Server response:', res);
            if (res.success) {
                this.poppupMessage = 'Profil mis à jour';
                this.ProfilePoppup();
                this.isSuccess = true;
            } else {
                this.poppupMessage = "Profil mis à jour";
                this.ProfilePoppup();
                this.isSuccess = false;
            }
        });
    }
    
    

    closePoppup() {
        this.dialog.closeAll();
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
