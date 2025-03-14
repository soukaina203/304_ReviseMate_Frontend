import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviserCarteMemoireComponent } from './reviser-carte-memoire.component';

describe('ReviserCarteMemoireComponent', () => {
  let component: ReviserCarteMemoireComponent;
  let fixture: ComponentFixture<ReviserCarteMemoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviserCarteMemoireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviserCarteMemoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
