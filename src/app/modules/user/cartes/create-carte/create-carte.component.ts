import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
  private uow = inject(UowService);
  iaResponse: any; // Variable pour stocker les données de redirection

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Vérification et récupération des données envoyées dans la redirection
    const navigationState = history.state?.iaResponse;

    if (navigationState) {
      this.iaResponse = navigationState;
      console.log('Données reçues de la redirection :', this.iaResponse);
      this.initializeForm();
    } else {
      console.log('Aucune donnée reçue via redirection.');
      this.initializeForm(); // Si aucune donnée reçue, on initialise quand même le formulaire
    }
  }

  // Initialisation du formulaire
  initializeForm() {
    this.carteMemoireForm = this.fb.group({
      titre: ['', Validators.required],
      id_utilisateur: [''], // Facultatif
      questions_reponses: this.fb.array([]) // Commence avec un tableau vide de questions/réponses
    });

    // Si iaResponse contient des questions et des réponses, on les ajoute au formulaire
    if (this.iaResponse && this.iaResponse.questions && this.iaResponse.questions.length > 0) {
      this.iaResponse.questions.forEach(questionReponse => {
        this.addQuestionReponse(questionReponse.question, questionReponse.reponse);
      });
    } else {
      // Ajouter une question par défaut si aucune donnée n'est présente
      this.addQuestionReponse('', '');
    }
  }

  // Créer un groupe de formulaire pour une question/réponse
  createQuestionReponseGroup(question: string = '', reponse: string = ''): FormGroup {
    return this.fb.group({
      question: [question, Validators.required],
      réponse: [reponse, Validators.required]
    });
  }

  // Ajouter une nouvelle question/réponse au FormArray
  addQuestionReponse(question: string = '', reponse: string = '') {
    const questionsReponses = this.carteMemoireForm.get('questions_reponses') as FormArray;
    const questionReponseFormGroup = this.createQuestionReponseGroup(question, reponse);
    questionsReponses.push(questionReponseFormGroup);
  }

  // Soumettre le formulaire
  onSubmit() {
    // Récupérer l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // Ajouter l'id_utilisateur au formulaire
      this.carteMemoireForm.patchValue({ id_utilisateur: user.id });

      // Vérifier si le formulaire est valide
      if (this.carteMemoireForm.valid) {
        console.log('Formulaire soumis avec succès:', this.carteMemoireForm.value);

        // Envoyer les données au backend via UowService
        this.uow.cartes.post(this.carteMemoireForm.value).subscribe((res: any) => {
          if (res.success) {
            console.log('Fiche enregistrée avec succès.');
            // Ajouter ici la gestion de la réponse (popup, redirection, etc.)
          } else {
            console.log('Erreur lors de l\'enregistrement de la fiche');
          }
        });
      } else {
        console.log('Le formulaire est invalide.');
      }
    } else {
      console.log('Aucun utilisateur trouvé dans le localStorage.');
    }
  }

  // Accesseur pour obtenir les contrôles de question/réponse
  get questionsReponses() {
    return this.carteMemoireForm.get('questions_reponses') as FormArray;
  }
}
