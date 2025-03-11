import { html2pdf } from 'html2pdf.js';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { Fiche } from 'app/models/Fiche';

@Component({
  selector: 'app-edit-fiche',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
  templateUrl: './edit-fiche.component.html',
  styleUrls: ['./edit-fiche.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditFicheComponent {
  content: string = '';  // Variable pour stocker le contenu de l'éditeur
  ficheName: string = ''; // Variable pour stocker le nom de la fiche
  id!: string; // Stocker l'ID
private uow = inject(UowService)

fiche:Fiche;
  constructor(private route: ActivatedRoute) {}
ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID de la fiche : ', this.id);
    this.uow.fiches.getOne(this.id).subscribe((e:any)=>{
        console.log("========")
        console.log(e)
       this.content=e.contenu
       this.ficheName=e.titre
        }  )
  }

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
