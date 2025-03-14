import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';
import { MatModule } from 'app/mat.modules';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cartes',
    standalone: true,
    imports: [CommonModule,MatModule,RouterLink],
    templateUrl: './cartes.component.html',
    styleUrls: ['./cartes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CartesComponent {
    private uow = inject(UowService)
    user: User = JSON.parse(localStorage.getItem("user"));
    message: string = '';

    cartes: CarteMemoire[] = []

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"))
        this.uow.cartes.getAll().subscribe((res: any) => {
            if (res.success) {


                if (res.data.length == 0) {
                    this.message = "Aucune carte mémoire trouvée";
                } else {
                    // .filter((carte: CarteMemoire) => carte.id_utilisateur == user?.id)
                    this.cartes = res.data
                    console.log(this.cartes)
                }
            }
            else {
                console.log(
                    "No data fetched"
                )
            }
        });
    }
    deleteCarte(id: number) {
        this.uow.cartes.delete(id).subscribe((res) => {
            console.log(res)
            this.ngOnInit();
        });
    }
}
