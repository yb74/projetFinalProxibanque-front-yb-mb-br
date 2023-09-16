import { TestBed } from '@angular/core/testing';

import { ConseillersService } from './conseillers.service';

describe('ConseillersService', () => {
  let service: ConseillersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConseillersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
