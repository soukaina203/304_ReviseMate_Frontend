import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import html2pdf from 'html2pdf.js';
import { Fiche } from 'app/models/Fiche';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.modules';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-fiche',
    standalone: true,
    imports: [CommonModule, QuillModule, FormsModule, MatModule],
    templateUrl: './create-fiche.component.html',
    styleUrls: ['./create-fiche.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateFicheComponent {

    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    ifError:boolean = false;
    content: string = '';  // Variable pour stocker le contenu de l'éditeur
    ficheName: string = ''; // Variable pour stocker le nom de la fiche
    fiche: Fiche = new Fiche();
    private dialog = inject(MatDialog)
    private uow = inject(UowService)
    private _router=inject(Router)

    PoppupContent: string = 'Fiche sauvegardée avec succès'; // Contenu du message de la popup


    ngOnInit(): void {
        const state = history.state as { iaResponse?: { revisionSheet: string } };;
        if (state && state.iaResponse) {
            this.fiche.contenu = state.iaResponse.revisionSheet;
            this.content = this.formatText(state.iaResponse.revisionSheet)

        }
    }

    formatText(text: string): string {
        if (!text) return '';

        text = text.replace(/\n{2,}/g, '\n');

        text = text.replace(/\*\*(.*?)\*\*/g, '<h2 class="text-2xl font-bold mt-4">$1</h2>');
        text = text.replace(/\+/g, '- ');

        text = text.replace(/\*(.*?)\*/g, '<b class="font-semibold">$1</b>');

        text = text.replace(/(<li class="ml-4 list-disc">.*?<\/li>)/g, '<ul class="list-outside pl-5">$1</ul>');
        text = text.replace(/(?:\n|^)[-+]\s(.*?)(?:\n|$)/g, '<li class="ml-4 list-disc">$1</li>');

        text = text.replace(/\n/g, '<br>');
        text = text.replace('--- --- ---', '');


        text = text.replace(/\|(.+?)\|/g, match => {
            const cells = match.split('|').filter(cell => cell.trim() !== '');
            const row = cells.map(cell => `<td class="border px-2 py-1">${cell.trim()}</td>`).join('');
            return `<tr>${row}</tr>`;
        });

        text = text.replace(/(<tr>.*?<\/tr>)/g, '<table class="border-collapse border w-full mt-2">$1</table>');

        return text;
    }



    saveFiche() {
        console.log(this.ficheName)
        if (this.ficheName === '' || this.ficheName === undefined) {
            this.ifError = true;
            this.PoppupContent = 'Veuillez renseigner le titre ';
            this.InfoPoppup();

        }else{
            let user = JSON.parse(localStorage.getItem("user"));

            this.fiche.contenu = this.content
            this.fiche.titre = this.ficheName
            this.fiche.date_creation = new Date();
            this.fiche.id_utilisateur = user?.id;
            this.fiche.id_cours = '67bde52bd528fe1ec83f031d';

            this.uow.fiches.post(this.fiche).subscribe((res: any) => {
                if (res.success) {
                    this.InfoPoppup();
                    this.PoppupContent = 'Fiche sauvegardée avec succès';
                    this.ifError = false;

                    this._router.navigateByUrl('/user/fiches');

                } else {
                    this.PoppupContent = 'Erreur lors de l\'enregistrement de la fiche';
                    this.InfoPoppup();
                }
            });
        }

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
