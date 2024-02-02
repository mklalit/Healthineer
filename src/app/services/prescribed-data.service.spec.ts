import { TestBed } from '@angular/core/testing';

import { PrescribedDataService } from './prescribed-data.service';

describe('PrescribedDataService', () => {
  let service: PrescribedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescribedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
