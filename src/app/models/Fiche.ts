import { SafeHtml } from "@angular/platform-browser";

export class Fiche {
    id?: string;
    contenu: SafeHtml;
    date_creation: Date;
    id_cours: string;
    titre: string;
    id_utilisateur:string;

}
