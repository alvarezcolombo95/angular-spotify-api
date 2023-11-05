import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultArtistComponent } from './search-result-artist.component';

describe('SearchResultArtistComponent', () => {
  let component: SearchResultArtistComponent;
  let fixture: ComponentFixture<SearchResultArtistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultArtistComponent]
    });
    fixture = TestBed.createComponent(SearchResultArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
