import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfPageComponent } from './prof-page.component';

describe('ProfPageComponent', () => {
  let component: ProfPageComponent;
  let fixture: ComponentFixture<ProfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
