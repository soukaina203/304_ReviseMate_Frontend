import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms'; 
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-create-fiche',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
  templateUrl: './create-fiche.component.html',
  styleUrls: ['./create-fiche.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateFicheComponent {
  content: string = '';  // Variable pour stocker le contenu de l'éditeur
  ficheName: string = ''; // Variable pour stocker le nom de la fiche

  // Méthode pour enregistrer la fiche
  saveFiche() {
    console.log('Fiche sauvegardée avec le contenu : ', this.content);
    // Ajouter ici le code pour enregistrer la fiche dans la base de données
  }

  // Méthode pour générer un PDF à partir du contenu de Quill
  generatePDF() {
    const element = document.querySelector('.ql-editor');
    if (element) {
      // Générer un PDF
      html2pdf()
        .from(element)
        .save('fiche.pdf');
    }
  }
   // Méthode pour gérer l'appui sur la touche "Entrée"
   onEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    this.saveFiche(); // Enregistre la fiche uniquement
  }
  
}