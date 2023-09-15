import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseillersComponent } from './conseillers.component';

describe('ConseillersComponent', () => {
  let component: ConseillersComponent;
  let fixture: ComponentFixture<ConseillersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConseillersComponent]
    });
    fixture = TestBed.createComponent(ConseillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
