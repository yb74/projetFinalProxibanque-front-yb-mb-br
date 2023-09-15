import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseillersFormComponent } from './conseillers-form.component';

describe('ConseillersFormComponent', () => {
  let component: ConseillersFormComponent;
  let fixture: ComponentFixture<ConseillersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConseillersFormComponent]
    });
    fixture = TestBed.createComponent(ConseillersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
