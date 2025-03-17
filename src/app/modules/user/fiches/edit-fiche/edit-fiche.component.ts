import { html2pdf } from 'html2pdf.js';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { Fiche } from 'app/models/Fiche';
import { MatDialog } from '@angular/material/dialog';
import { MatModule } from 'app/mat.modules';

@Component({
    selector: 'app-edit-fiche',
    standalone: true,
    imports: [CommonModule, QuillModule, FormsModule,MatModule],
    templateUrl: './edit-fiche.component.html',
    styleUrls: ['./edit-fiche.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditFicheComponent {
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    content: string = '';  // Variable pour stocker le contenu de l'éditeur
    ficheName: string = ''; // Variable pour stocker le nom de la fiche
    id!: string; // Stocker l'ID
    PoppupContent: string = 'Fiche sauvegardée avec succès'; // Contenu du message de la popup
    ifError: boolean = false; // Variable pour gérer les erreurs
    private uow = inject(UowService)
    private dialog = inject(MatDialog)
    private route = inject(ActivatedRoute)
    private _router = inject(Router)

    fiche: Fiche = new Fiche();

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        console.log('ID de la fiche : ', this.id);
        this.uow.fiches.getOne(this.id).subscribe((e: any) => {
            this.fiche = e.data
            this.content = e.data.contenu
            this.ficheName = e.data.titre
        })
    }

    // Méthode pour enregistrer la fiche
    saveFiche() {
    console.log('Fiche sauvegardée avec le contenu : ', this.content);
        this.fiche.contenu = this.content
        this.fiche.titre = this.ficheName
        this.uow.fiches.put(this.id, this.fiche).subscribe((res: any) => {
            if (res != null) {
               this.InfoPoppup();
               this._router.navigateByUrl('/user/fiches');

            }else{
                console.log('Erreur lors de l\'enregistrement de la fiche');
                this.PoppupContent='Erreur lors de l\'enregistrement de la fiche';
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
