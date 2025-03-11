import { filter } from 'rxjs';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.modules';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { Fiche } from 'app/models/Fiche';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fiches',
  standalone: true,
  imports: [CommonModule,MatModule,RouterLink],
  templateUrl: './fiches.component.html',
  styleUrl: './fiches.component.scss'
})
export class FichesComponent {

    private uow = inject(UowService)
    user: User = JSON.parse(localStorage.getItem("user"));

    fiches:Fiche[]=[]

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"))
        this.uow.fiches.getAll().subscribe((data:any) => {
            console.log(user.id)
            console.log(data)
            if (data !== null ) {
                this.fiches=data.filter((fiche:Fiche)=>fiche.id_utilisateur==user.id)
            }
            else {
                console.log(
                    "No data fetched"
                )
            }
        });
    }
}
