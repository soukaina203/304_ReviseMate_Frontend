import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';

@Component({
  selector: 'app-cartes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartes.component.html',
  styleUrl: './cartes.component.scss'
})
export class CartesComponent {
    private uow = inject(UowService)
    user: User = JSON.parse(localStorage.getItem("user"));

    cartes:CarteMemoire[]=[]

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"))
        this.uow.cartes.getAll().subscribe((data:any) => {
            if (data !== null ) {
                this.cartes=data.filter((carte:CarteMemoire)=>carte.id_utilisateur==user?.id)
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
