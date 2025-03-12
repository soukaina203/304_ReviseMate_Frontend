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
                    this.fiches = res.data.map((fiche: Fiche) => {
                        fiche.contenu = this.sanitizeHtml(fiche.contenu).toString(); // Convert SafeHtml to string
                        return fiche;
                    });

                }
            } else {
                console.log("No data fetched");
            }
        });
    }

    sanitizeHtml(content: any): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content.toString());
    }

    truncateText(text: string, limit: number): SafeHtml {


        // Suppression de la partie "SafeValue must use [property]=binding:"
        text = text.replace(/^SafeValue must use \[property\]=binding:/, '').trim();

        const div = document.createElement("div");
        div.innerHTML = text;
        const plainText = div.innerText;  // Extraction du texte brut
        const truncatedText = plainText.length > limit ? plainText.substring(0, limit) + "..." : plainText;

        return this.sanitizer.bypassSecurityTrustHtml(truncatedText);
    }

    deleteFiche(id: number) {
        this.uow.fiches.delete(id).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
}
