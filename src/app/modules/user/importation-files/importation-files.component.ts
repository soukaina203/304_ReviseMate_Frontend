import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';  // Importer NgxFileDropModule ici

@Component({
  selector: 'app-importation-files',
  standalone: true,
  imports: [CommonModule, NgxFileDropModule],  // Ajouter NgxFileDropModule ici
  templateUrl: './importation-files.component.html',
  styleUrls: ['./importation-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
  onFileDrop(event: { files: any[] }) {
    console.log(event.files);
  }
}

