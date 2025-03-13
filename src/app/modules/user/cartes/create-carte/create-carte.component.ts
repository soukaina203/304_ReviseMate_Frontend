import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.carteMemoireForm = this.fb.group({
      titre: ['', Validators.required],
      id_fiche: [''], // Facultatif
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
    if (this.carteMemoireForm.valid) {
      console.log('Formulaire soumis', this.carteMemoireForm.value);
      // Ajoutez ici la logique pour envoyer les données à votre backend
    } else {
      console.log('Formulaire invalide');
    }
  }

  // Accesseur pour obtenir les contrôles de question/réponse
  get questionsReponses() {
    return this.carteMemoireForm.get('questions_reponses') as FormArray;
  }
}
