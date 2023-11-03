import { TestBed } from '@angular/core/testing';

import { SpotifySearchItemService } from './spotify-search-item.service';

describe('SpotifySearchItemService', () => {
  let service: SpotifySearchItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifySearchItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
