import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IaGenerationService } from './../../../services/ia-generation.service';

@Component({
  selector: 'app-importation-files',
  standalone: true,
  imports: [CommonModule, NgxFileDropModule, ReactiveFormsModule],
  templateUrl: './importation-files.component.html',
  styleUrls: ['./importation-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
  form: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  private iaGenerationService = inject(IaGenerationService);

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
    if (this.form.get('file')?.value) {
      const formData = new FormData();
      formData.append('file', this.form.get('file')?.value);
      formData.append('customPrompt', this.form.get('promt')?.value);

      this.iaGenerationService.getIAanswerFromPdf(formData).subscribe(r => {
        console.log('PDF response:', r);
      });
    } else if (this.form.get('text')?.value) {
      const textData = {
        text: this.form.get('text')?.value,
        customPrompt: this.form.get('promt')?.value
      };

      this.iaGenerationService.getIAanswerFromText(textData).subscribe(r => {
        console.log('Text response:', r);
      });
    }
  }
}
