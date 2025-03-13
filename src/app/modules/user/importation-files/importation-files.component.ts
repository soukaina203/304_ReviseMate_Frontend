import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IaGenerationService } from './../../../services/ia-generation.service';
import { Router } from '@angular/router';
import { MatModule } from 'app/mat.modules';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-importation-files',
    standalone: true,
    imports: [CommonModule, NgxFileDropModule, ReactiveFormsModule,MatModule],
    templateUrl: './importation-files.component.html',
    styleUrls: ['./importation-files.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
    PoppupContent:string='Veuillez patienter quelques instants'
    form: UntypedFormGroup;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    private _formBuilder = inject(UntypedFormBuilder);
    private iaGenerationService = inject(IaGenerationService);
    private _router= inject(Router);
    private dialog = inject(MatDialog)

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            file: [null],
            text: [''],
            promt: ['', [Validators.required]],
            type: ['fiche', [Validators.required]],
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.form.patchValue({ file });
            this.form.get('text')?.setValue('');
            console.log('File selected:', file);
        }

    }

    submit() {
        // Return if the form is invalid
        if (this.form.invalid) {
            return;
        }

        // Disable the form
        this.form.disable();
        if (this.form.get('file')?.value) {
            const formData = new FormData();
            formData.append('file', this.form.get('file')?.value);
            formData.append('customPrompt', this.form.get('promt')?.value);
            this.form.enable();

            this.InfoPoppup()
            this.iaGenerationService.getIAanswerFromPdf(formData).subscribe(r => {
                console.log('PDF response:', r);
                this.dialog.closeAll();
                this._router.navigateByUrl('/user/fiches/create', { state: { iaResponse: r } });

            });
        } else if (this.form.get('text')?.value) {
            this.form.enable();
            const textData = {
                text: this.form.get('text')?.value,
                customPrompt: this.form.get('promt')?.value
            };
            this.iaGenerationService.getIAanswerFromText(textData).subscribe(r => {
                console.log('Text response:', r);
            });
        }
    }

    InfoPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
}
