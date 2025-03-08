import { messages } from './../../../mock-api/apps/chat/data';
import { NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    isShow: boolean = false
    idProfRole:boolean = false

    isChecked: boolean = false
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    showAlertCode: boolean = false;
    passwordHidden: any;
    codeProf: number;
    @ViewChild('securityPoppup') securityPoppup!: TemplateRef<any>;

    /**AuthServiceService
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private dialog: MatDialog

    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({

            lastName: ['Mourabit', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            firstName: ['Soukaina', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            email: ['soukaina@gmail.com', [Validators.required, Validators.email]],
            password: ['bdfhbgf@vdf', [Validators.minLength(7), Validators.required]],
            confirmPassword: ['', [Validators.required]],

            idClasse:null, // on precise paa les classes pendant l'inscription
            idRole: 2 // par defaut le role d'utilisateur est 2 => celui d'etudiant
        },
        );
    }



    verify() {
        const user = this.signUpForm.getRawValue();
        user.password !== user.confirmPassword ? this.isShow = true : this.isShow = false

    }
    openSecurityPoppup(): void {
        const dialogRef = this.dialog.open(this.securityPoppup, {
            height: '380px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });


    }
    closePoppup(){
        this.dialog.closeAll()
    }
    submitCodeProf() {
        this._authService.VerifyCodeProf(this.codeProf).subscribe((res) => {
            console.log(res)
            if (res.message==='Le code est incorrect.') {
                     // Set the alert
                     this.alert = {
                        type: 'error',
                        message: res.message,
                    };

                    // Show the alert
                    this.showAlertCode = true;
            }else{
                this.alert = {
                    type: 'info',
                    message: res.message,
                };
                this.showAlertCode = true;
                this.idProfRole=true

            }
        })
    }
    isProf() {
        if (!this.isChecked) {
            this.openSecurityPoppup()
            this.isChecked = true
        } else {
            this.isChecked = false

        }
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }
        this.signUpForm.disable();

        this.showAlert = false;
        this.idProfRole?  this.signUpForm.patchValue({ idRole: 1 }):console.log("object")
        this._authService.signUp(this.signUpForm.value).subscribe((res)=>{
            console.log(res)
            this.signUpForm.enable();
            if (res.message==="Inscription réussie") {
            this.showAlert = true;

                this.alert = {
                    type: 'info',
                    message: res.message,
                };
        this._router.navigateByUrl('/sign-in');
            }else{
            this.showAlert = true;

                this.alert = {
                    type: 'error',
                    message: res.message,
                };
            }
            this.showAlert = true;

        })

    }
}
