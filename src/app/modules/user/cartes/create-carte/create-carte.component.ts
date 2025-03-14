import { Component, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-carte',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-carte.component.html',
    styleUrls: ['./create-carte.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateCarteComponent implements OnInit {
    carteMemoireForm: FormGroup;
    private uow = inject(UowService)
    PoppupContent = '';
    ifError: boolean = false;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    private dialog = inject(MatDialog)
    private router = inject(Router)

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.carteMemoireForm = this.fb.group({
            titre: ['', Validators.required],
            id_utilisateur: [''], // Facultatif
            questions_reponses: this.fb.array([
                this.createQuestionReponseGroup()
            ])
        });
    }

    // Fonction pour créer un groupe de formulaire pour une question/réponse
    createQuestionReponseGroup(): FormGroup {
        return this.fb.group({
            question: ['', Validators.required],
            réponse: ['', Validators.required]
        });
    }

    // Fonction pour ajouter une nouvelle section de question/réponse
    addQuestionReponse() {
        const questionsReponses = this.carteMemoireForm.get('questions_reponses') as FormArray;
        questionsReponses.push(this.createQuestionReponseGroup());
    }

    // Fonction pour soumettre le formulaire
    onSubmit() {
        let user = JSON.parse(localStorage.getItem("user"));

        this.carteMemoireForm.patchValue({ id_utilisateur: user.id });


        // if (this.carteMemoireForm.valid) {
        //   console.log('Formulaire soumis', this.carteMemoireForm.value);
        //   // Ajoutez ici la logique pour envoyer les données à votre backend
        // } else {
        //   console.log('Formulaire invalide');
        // }
        console.log(this.carteMemoireForm.value)
        this.uow.cartes.post(this.carteMemoireForm.value).subscribe((res: any) => {
            console.log(res)
            if (res.success) {
                this.ifError = false;
                this.dialog.closeAll();
                this.router.navigate(['/user/cartes']);
            } else {
                this.PoppupContent = 'Erreur lors de l\'enregistrement de modification de la carte';
                this.ifError = true;
                this.InfoPoppup();

            }
        });



    }

    // Accesseur pour obtenir les contrôles de question/réponse
    get questionsReponses() {
        return this.carteMemoireForm.get('questions_reponses') as FormArray;
    }
    InfoPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
}
