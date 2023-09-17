import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportTransactionsComponent } from './rapport-transactions.component';

describe('RapportTransactionsComponent', () => {
  let component: RapportTransactionsComponent;
  let fixture: ComponentFixture<RapportTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportTransactionsComponent]
    });
    fixture = TestBed.createComponent(RapportTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
