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
            console.log(user.id)
            console.log(data)
            if (data !== null ) {
                this.cartes=data
            }
            else {
                console.log(
                    "No data fetched"
                )
            }
        });
    }
}
