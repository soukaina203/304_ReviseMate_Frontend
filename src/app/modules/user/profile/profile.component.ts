// import { Component, TemplateRef, ViewChild } from '@angular/core';
// import { CommonModule, NgIf } from '@angular/common';
// import { User } from 'app/models/User';
// import { Role } from 'app/models/Role';
// import { UowService } from 'app/services/uow.service';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatModule } from 'app/mat.module';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FuseAlertComponent } from '@fuse/components/alert';
// @Component({
//     selector: 'app-profile',
//     standalone: true,
//     imports: [RouterLink, FuseAlertComponent, NgIf,
//         FormsModule, ReactiveFormsModule, MatFormFieldModule, MatModule,MatIconModule,
//         MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule,
//         MatProgressSpinnerModule],
//     templateUrl: './profile.component.html',
//     styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {
//     id: any = 0;
//     myForm: FormGroup;
//     user: User = new User(); // Initialize the user object
//     roles: Role[] = []
//     isProf: boolean = false;
//     commingPwd = '';
//     poppupMessage: string = ''
//     isSuccess: boolean = false // used for make sure that the  modification is successfully passed
//     @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
//     @ViewChild('DeletePoppup') DeletePoppup!: TemplateRef<any>;

//     constructor(
//         private uow: UowService,
//         private fb: FormBuilder,
//         private router: Router,
//         private dialog: MatDialog,


//     ) { }

//     ngOnInit(): void {
//         const localStorage1 = localStorage.getItem('user');
//         if (localStorage1) {
//             let userStorage = JSON.parse(localStorage1)
//             this.id = userStorage.id
//         }

//         this.uow.roles.getAll().subscribe((res: any) => {
//             this.roles = res;
//         })


//         this.uow.users.getOne(this.id).subscribe((res:any) => {
//             console.log(res)
//             if (res?.code!==404) {
//                 this.user = res; // Update the user object with the fetched data
//                 this.commingPwd = res.password
//                 this.createForm(); // Create the form after the user data is available
//                 this.user.idRole === 3 ? this.isProf = true : this.isProf = false;

//             }else{
//                 this.DeletedUserPoppup()
//             }
//         });

//     }

//     createForm() {
//         this.myForm = this.fb.group({
//             id: [this.user.id],
//             nom: [this.user.nom, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
//             prenom: [this.user.prenom, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
//             email: [this.user.email, [Validators.required, Validators.email]],
//             address: [this.user.address, [Validators.required, Validators.minLength(3)]],
//             telephone: [this.user.telephone, [Validators.required, Validators.pattern('^0(6|7)[0-9]{8}$')]],
//             password: ['', [Validators.minLength(7),]],
//             idRole: [this.user.idRole],
//             status: [this.user.status],
//         });
//     }

//     choosenRole(id: number) {
//         id === 3 ?
//             this.isProf = true :
//             this.isProf = false;
//     }
//     toggleEditMode() {
//         this.router.navigate(['/admin/users']);
//     }

//     update(user) {
//         if (user.password === '') {
//             user.password = this.commingPwd
//         }

//         this.uow.users.put(this.id, user).subscribe((res) => {
//             if (res.m === "success") {
//                 this.ProfilePoppup()
//                 this.poppupMessage = 'Profil mis à jour'
//                 this.uow.users.user$.next(user)
//                 this.isSuccess = true
//             } else {

//                 this.ProfilePoppup()
//                 this.poppupMessage = "L'email existe déjà"
//                 this.isSuccess = false

//             }
//         })
//     }

//     closePoppup(){
//         this.dialog.closeAll()
//     }
//     ProfilePoppup(): void {
//         // it can be used for showing errors or affirmation infos
//         const dialogRef = this.dialog.open(this.popupTemplate, {
//             height: '200px',
//             width: '500px'
//         });
//         dialogRef.afterClosed().subscribe((result) => {
//         });
//     }

//     DeletedUserPoppup(): void {
//         // it can be used for showing errors or affirmation infos
//         const dialogRef = this.dialog.open(this.DeletePoppup, {
//             height: '300px',
//             width: '500px'
//         });
//         dialogRef.afterClosed().subscribe((result) => {
//         });
//     }

// }



