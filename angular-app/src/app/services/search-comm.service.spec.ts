import { TestBed } from '@angular/core/testing';

import { SearchCommService } from './search-comm.service';

describe('SearchCommService', () => {
  let service: SearchCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
