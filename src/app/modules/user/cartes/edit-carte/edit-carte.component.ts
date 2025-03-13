import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute } from '@angular/router';
import { CarteMemoire } from 'app/models/Carte';

@Component({
  selector: 'app-edit-carte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-carte.component.html',
  styleUrl: './edit-carte.component.scss'
})
export class EditCarteComponent {
 carteMemoireForm: FormGroup;
    private uow = inject(UowService)
    private route = inject(ActivatedRoute)
    id!: string; // Stocker l'ID
   carte:CarteMemoire=new CarteMemoire();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
 this.uow.cartes.getOne(this.id).subscribe((e: any) => {
    console.log(e)
    if (e.data!=null) {
        this.carte = e.data

    }else{
        console.log('Erreur lors de recuperation de carte memoire');
    //     this.PoppupContent='Erreur lors de l\'enregistrement de la fiche';
    //    this.InfoPoppup();
    }
 });

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
      reponse: ['', Validators.required]
    });
  }

  // Fonction pour ajouter une nouvelle section de question/réponse
  addQuestionReponse() {
    const questionsReponses = this.carteMemoireForm.get('questions_reponses') as FormArray;
    questionsReponses.push(this.createQuestionReponseGroup());
  }

  // Fonction pour soumettre le formulaire
  onSubmit() {
  let  user = JSON.parse(localStorage.getItem("user"));

    this.carteMemoireForm.patchValue({ id_utilisateur: user.id });


    // if (this.carteMemoireForm.valid) {
    //   console.log('Formulaire soumis', this.carteMemoireForm.value);
    //   // Ajoutez ici la logique pour envoyer les données à votre backend
    // } else {
    //   console.log('Formulaire invalide');
    // }
    console.log(this.carteMemoireForm.value)
   this.uow.cartes.post(this.carteMemoireForm.value).subscribe((res: any) => {
    //  console.log(res)
    // if (res.success) {
    //     this.InfoPoppup();
    // } else {
    //     console.log('Erreur lors de l\'enregistrement de la fiche');
    //     this.PoppupContent = 'Erreur lors de l\'enregistrement de la fiche';
    //     this.InfoPoppup();

    // }
   });



  }

  // Accesseur pour obtenir les contrôles de question/réponse
  get questionsReponses() {
    return this.carteMemoireForm.get('questions_reponses') as FormArray;
  }
}
