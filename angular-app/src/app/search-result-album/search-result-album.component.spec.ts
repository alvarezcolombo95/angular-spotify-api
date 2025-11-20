import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultAlbumComponent } from './search-result-album.component';

describe('SearchResultAlbumComponent', () => {
  let component: SearchResultAlbumComponent;
  let fixture: ComponentFixture<SearchResultAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultAlbumComponent]
    });
    fixture = TestBed.createComponent(SearchResultAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
