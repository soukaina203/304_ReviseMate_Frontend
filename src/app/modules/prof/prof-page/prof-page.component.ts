import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prof-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prof-page.component.html',
  styleUrls: ['./prof-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfPageComponent {
  students = [
    {
      nom: 'Prénom Nom',
      isOnline: true,
      score: { current: 17, max: 20 }, // Score actuel et maximum
      fiches: ['Fiche 1', 'Fiche 2'],
      cartesMemoire: ['Carte 1', 'Carte 2'],
      quizzes: ['Quiz 1']
    },
    {
      nom: 'Prénom Nom',
      isOnline: false,
      score: { current: 18, max: 20 }, // Score actuel et maximum
      fiches: ['Fiche 3'],
      cartesMemoire: ['Carte 3'],
      quizzes: ['Quiz 2', 'Quiz 3']
    },
    // Ajoute d'autres étudiants ici
  ];
  

  isModalOpen = false; // Variable pour contrôler l'ouverture de la modal
  selectedStudent = null; // Étudiant sélectionné à afficher dans la modal

  // Ouvre la modal et sélectionne l'étudiant
  openModal(student) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  // Ferme la modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }
}
