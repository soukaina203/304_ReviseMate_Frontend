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
import { AuthService } from 'app/core/auth/auth.service';
import { AuthServiceService } from 'app/services/auth-service.service';

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
    isChecked: boolean = false
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    passwordHidden: any;
    codeProf: number;
    @ViewChild('securityPoppup') securityPoppup!: TemplateRef<any>;

    /**AuthServiceService
     * Constructor
     */
    constructor(
        private _authService: AuthServiceService,
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

            lastName: ['bdfhbgf', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            firstName: ['bdfhbgf', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            email: ['bdfhbgf@vdf', [Validators.required, Validators.email]],
            password: ['bdfhbgf@vdf', [Validators.minLength(7), Validators.required]],
            idRole: 2
        },
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    openSecurityPoppup(): void {
        const dialogRef = this.dialog.open(this.securityPoppup, {
            height: '380px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {

        });


    }
    submitCodeProf() {
        this._authService.VerifyCodeProf(this.codeProf).subscribe((res) => {
            console.log(res)
            if (!res) {
                     // Set the alert
                     this.alert = {
                        type: 'error',
                        message: 'Le code est incorrect',
                    };

                    // Show the alert
                    this.showAlert = true;
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
        console.log('hello')
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/sign-in');
                },
                (response) => {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.',
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );
    }
}
