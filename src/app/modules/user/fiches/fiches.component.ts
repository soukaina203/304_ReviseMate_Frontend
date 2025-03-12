import { filter } from 'rxjs';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.modules';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { Fiche } from 'app/models/Fiche';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-fiches',
    standalone: true,
    imports: [CommonModule, MatModule, RouterLink],
    templateUrl: './fiches.component.html',
    styleUrls: ['./fiches.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FichesComponent {

    private uow = inject(UowService)
    user: User = JSON.parse(localStorage.getItem("user"));

    fiches: Fiche[] = []

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem("user"))
        this.uow.fiches.getAll().subscribe((data: any) => {
            console.log(data)
            if (data !== null) {
                this.fiches = data
            }
            else {
                console.log(
                    "No data fetched"
                )
            }
        });
    }

    deleteFiche(id: number) {
        this.uow.fiches.delete(id).subscribe((res) => {
            console.log(res)
            this.ngOnInit();
        });
    }


}
