// Importation des données fictives de messages pour le chat
import { messages } from './../../../mock-api/apps/chat/data';

// Importation des modules nécessaires d'Angular
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

// Importation des animations et composants externes
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';

// Importation des modèles et services utilisés
import { Role } from 'app/models/Role';
import { AuthService } from 'app/services/auth.service';
import { UowService } from 'app/services/uow.service';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Définition du validateur pour la correspondance des mots de passe
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password === confirmPassword ? null : { mismatch: true };
};

@Component({
    selector: 'auth-sign-up', // Sélecteur du composant
    templateUrl: './sign-up.component.html', // Fichier HTML associé
    encapsulation: ViewEncapsulation.None, // Désactive l'encapsulation des styles
    animations: fuseAnimations, // Applique les animations prédéfinies
    standalone: true, // Composant autonome
    imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit {

    passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    // Récupération du formulaire via ViewChild
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    // Objet pour gérer l'affichage des alertes
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    // Variables pour la gestion de l'état du formulaire et des rôles
    isShow: boolean = false;
    idProfRole: boolean = false;
    isChecked: boolean = false;
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    showAlertCode: boolean = false;
    passwordHidden: any;
    codeProf: number
    id_role: string;
    roles: any[] = [];

    // Récupération du template pour la fenêtre modale de sécurité
    @ViewChild('securityPoppup') securityPoppup!: TemplateRef<any>;

    /**
     * Constructeur du composant
     */
    constructor(
        private _authService: AuthService, // Service d'authentification
        private _formBuilder: UntypedFormBuilder, // Constructeur de formulaire
        private _router: Router, // Service de navigation
        private dialog: MatDialog, // Service de gestion des dialogues modaux
        private uow: UowService // Service pour récupérer les rôles

    ) {}

    /**
     * Initialisation du composant
     */
    ngOnInit(): void {
        // Création du formulaire d'inscription
        this.createForm();

        // Récupération des rôles depuis le service
        this.uow.roles.getAll().subscribe((res: any) => {
            console.log(res);
            if (res.success) {
                this.roles = res.data;
                // Récupération de l'ID du rôle "Étudiant"
                this.id_role = this.roles.find((e) => e.nom === "Étudiant")?._id;
                console.log(this.roles);
                // Mise à jour du champ id_role du formulaire
                this.signUpForm.patchValue({ id_role: this.id_role });
            } else {
                console.log("Un problème est survenu lors de la récupération des rôles");
            }
        });
    }

    /**
     * Création et configuration du formulaire d'inscription
     */
    createForm() {
        this.signUpForm = this._formBuilder.group({
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(this.passwordPattern)
            ]],
            confirmPassword: ['', [Validators.required]],
            role: "Étudiant",
            code_prof: null,
        }, { validators: passwordMatchValidator });
    }



    /**
     * Vérification de la correspondance entre le mot de passe et la confirmation
     */
    verify() {
        const user = this.signUpForm.getRawValue();
        this.isShow = user.password !== user.confirmPassword;
    }

    /**
     * Ouverture de la fenêtre modale de sécurité
     */
    openSecurityPoppup(): void {
        const dialogRef = this.dialog.open(this.securityPoppup, {
            height: '380px',
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Fermeture de toutes les fenêtres modales ouvertes
     */
    closePoppup() {
        this.dialog.closeAll();
    }

    /**
     * Soumission du code de vérification pour le rôle "Professeur"
     */


    submitCodeProf() {

        this.dialog.closeAll();
            this.signUpForm.patchValue({
                role: "professeur",
            });


    }

    /**
     * Vérification si l'utilisateur est un professeur
     * Ouvre la popup de sécurité si nécessaire
     */
    isProf() {
        if (!this.isChecked) {
            this.openSecurityPoppup();
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
    }

    /**
     * Soumission du formulaire d'inscription
     */
    signUp(): void {
        // Vérification de la validité du formulaire
        if (this.signUpForm.invalid) {
            // Vérification spécifique pour la correspondance des mots de passe
            if (this.signUpForm.hasError('mismatch')) {
                this.showAlert = true;
                this.alert = {
                    type: 'error',
                    message: 'Les mots de passe ne correspondent pas.',
                };
            }
            return;
        }

        // Désactivation du formulaire pour éviter une double soumission
        this.signUpForm.disable();
        this.showAlert = false;

        console.log(this.signUpForm.value);

        this.signUpForm.patchValue({
            code_prof: this.codeProf,
        });

        // Suppression de la confirmation du mot de passe avant l'envoi
        const { confirmPassword, ...formData } = this.signUpForm.value;

        // Appel du service d'inscription
        this._authService.signUp(formData).subscribe((res) => {
            this.signUpForm.enable();

            // Gestion de la réponse du serveur
            if (res.message === "Inscription réussie") {
                this.showAlert = true;
                this.alert = {
                    type: 'info',
                    message: res.message,
                };
                // Redirection vers la page de connexion
                this._router.navigateByUrl('/sign-in');
            } else {
                this.showAlert = true;
                this.alert = {
                    type: 'error',
                    message: res.message,
                };
            }
        });
    }

}
