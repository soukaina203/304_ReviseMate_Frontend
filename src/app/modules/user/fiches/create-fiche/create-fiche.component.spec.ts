import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFicheComponent } from './create-fiche.component';

describe('CreateFicheComponent', () => {
  let component: CreateFicheComponent;
  let fixture: ComponentFixture<CreateFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
