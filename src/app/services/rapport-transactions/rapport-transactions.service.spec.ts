import { TestBed } from '@angular/core/testing';

import { RapportTransactionsService } from './rapport-transactions.service';

describe('RapportTransactionsService', () => {
  let service: RapportTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
