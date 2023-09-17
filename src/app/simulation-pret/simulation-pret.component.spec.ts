import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPretComponent } from './simulation-pret.component';

describe('SimulationPretComponent', () => {
  let component: SimulationPretComponent;
  let fixture: ComponentFixture<SimulationPretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulationPretComponent]
    });
    fixture = TestBed.createComponent(SimulationPretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
