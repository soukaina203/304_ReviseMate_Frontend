import { messages } from './../../../mock-api/common/messages/data';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.modules';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { Fiche } from 'app/models/Fiche';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-fiches',
    standalone: true,
    imports: [CommonModule, MatModule, RouterLink],
    templateUrl: './fiches.component.html',
    styleUrls: ['./fiches.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FichesComponent {

    private uow = inject(UowService);
    private sanitizer = inject(DomSanitizer);
    message: string = '';
    user: User = JSON.parse(localStorage.getItem("user"));

    fiches: Fiche[] = [];

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"));
        this.uow.fiches.getAll().subscribe((res: any) => {
            if (res.success) {
                if (res.data.length == 0) {
                    this.message = "Aucune fiche trouvée";
                } else {
                    let userFiches=res.data.filter(fiche=>fiche.id_utilisateur==user.id);

                    this.fiches = userFiches.map((fiche: Fiche) => {
                        fiche.contenu = this.removeHtmlTags(fiche.contenu.toString()); // Supprime les balises HTML
                        return fiche;
                    });


                }
            } else {
                console.log("No data fetched");
            }
        });
    }


    removeHtmlTags(html: string): string {
        if (!html) return ''; // Vérifie si html est null ou undefined

        const div = document.createElement("div");
        div.innerHTML = html;
        return div.innerText; // Récupère uniquement le texte sans les balises
    }




    deleteFiche(id: number) {
        this.uow.fiches.delete(id).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
}
