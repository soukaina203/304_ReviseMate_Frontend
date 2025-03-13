import { IaGenerationService } from './../../../services/ia-generation.service';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';  // Importer NgxFileDropModule ici
import { IA } from 'app/models/IA';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UowService } from 'app/services/uow.service';

@Component({
    selector: 'app-importation-files',
    standalone: true,
    imports: [CommonModule, NgxFileDropModule, ReactiveFormsModule],  // Ajouter NgxFileDropModule ici
    templateUrl: './importation-files.component.html',
    styleUrls: ['./importation-files.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
    form: UntypedFormGroup;
    private _formBuilder = inject(UntypedFormBuilder);
    uow:UowService=inject(UowService);
    ngOnInit(): void {
        // Create the form
        this.form = this._formBuilder.group({

            file: ['', [Validators.required]],
            promt: ['', [Validators.required]],
            type: ['fiche', [Validators.required]],

        },
        );
    }

    // iaObject: IA = new IA();
    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.form.patchValue({
                file: file
            }); console.log(file)
        }
    }
    submit() {

        const formData: FormData = new FormData();
        formData.append('file', this.form.get('file').value);
        formData.append('promt', this.form.get('promt').value);
        formData.append('type', this.form.get('type').value);


        console.log(formData);
        this.uow.ia.getIAanswer(formData).subscribe(r => {
            console.log(r);
        });
    }
}

