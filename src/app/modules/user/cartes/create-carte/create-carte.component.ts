import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from 'app/services/uow.service';
import { User } from 'app/models/User';
import { CarteMemoire } from 'app/models/Carte';

@Component({
  selector: 'app-create-carte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-carte.component.html',
  styleUrl: './create-carte.component.scss'
})
export class CreateCarteComponent {

}
