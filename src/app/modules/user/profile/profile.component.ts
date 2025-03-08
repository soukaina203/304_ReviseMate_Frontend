import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Role } from 'app/models/Role';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseAlertComponent } from '@fuse/components/alert';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { Classe } from 'app/models/Classe';
import { MatModule } from 'app/mat.modules';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, FuseAlertComponent,CommonModule,
        FormsModule, ReactiveFormsModule,
         MatModule
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

        this.uow.classes.getAll().subscribe((res: any) => {
            if (res !== null) {
                this.classes = res
            }else{
                console.log("a problem occur while fetching data")
            }
        })

        this.uow.users.getOne(this.id).subscribe((res: any) => {
            console.log(res)
            if (res?.code !== 404) {
                this.user = res;
                this.commingPwd = res.password
                this.createForm();
                this.user.idRole === 3 ? this.isProf = true : this.isProf = false;

            } else {
                this.DeletedUserPoppup()
            }
        });

    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.user.id],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(7),]],
            idRole: [this.user.idRole],
            idClasse: [this.user.idClasse],
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
            if (res.m === "success") {
                this.ProfilePoppup()
                this.poppupMessage = 'Profil mis à jour'
                this.isSuccess = true
            } else {

                this.ProfilePoppup()
                this.poppupMessage = "L'email existe déjà"
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



