import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationFilesComponent } from './importation-files.component';

describe('ImportationFilesComponent', () => {
  let component: ImportationFilesComponent;
  let fixture: ComponentFixture<ImportationFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportationFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportationFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
