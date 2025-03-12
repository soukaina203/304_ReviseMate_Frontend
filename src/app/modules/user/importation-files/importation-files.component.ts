import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';  // Importer NgxFileDropModule ici
import { IA } from 'app/models/IA';

@Component({
  selector: 'app-importation-files',
  standalone: true,
  imports: [CommonModule, NgxFileDropModule],  // Ajouter NgxFileDropModule ici
  templateUrl: './importation-files.component.html',
  styleUrls: ['./importation-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
    iaObject : IA = new IA();
    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];

            this.iaObject.file = file;
        }
      }
}

