import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import html2pdf from 'html2pdf.js';
import { Fiche } from 'app/models/Fiche';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.modules';

@Component({
    selector: 'app-create-fiche',
    standalone: true,
    imports: [CommonModule, QuillModule, FormsModule,MatModule],
    templateUrl: './create-fiche.component.html',
    styleUrls: ['./create-fiche.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateFicheComponent {

    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    content: string = '';  // Variable pour stocker le contenu de l'éditeur
    ficheName: string = ''; // Variable pour stocker le nom de la fiche
    fiche: Fiche = new Fiche();
    private dialog = inject(MatDialog)
    private uow = inject(UowService)

    PoppupContent: string = 'Fiche sauvegardée avec succès'; // Contenu du message de la popup

    // Méthode pour enregistrer la fiche
    saveFiche() {
        let user = JSON.parse(localStorage.getItem("user"));

        console.log('Fiche sauvegardée avec le contenu : ', this.content);
        this.fiche.contenu = this.content
        this.fiche.titre = this.ficheName
        this.fiche.date_creation= new Date();
        this.fiche.id_utilisateur=user?.id;
        this.fiche.id_cours='67bde52bd528fe1ec83f031d';
        console.log(this.fiche)
         this.uow.fiches.post(this.fiche).subscribe((res: any) => {
             if (res.success) {
                 this.InfoPoppup();
             } else {
                 console.log('Erreur lors de l\'enregistrement de la fiche');
                 this.PoppupContent = 'Erreur lors de l\'enregistrement de la fiche';
                 this.InfoPoppup();

             }
         });
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
    InfoPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

}
