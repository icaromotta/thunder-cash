import { TestBed } from '@angular/core/testing';

import { CashbackService } from './cashback.service';

describe('CashbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashbackService = TestBed.get(CashbackService);
    expect(service).toBeTruthy();
  });
});
