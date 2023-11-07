import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultSongComponent } from './search-result-song.component';

describe('SearchResultSongComponent', () => {
  let component: SearchResultSongComponent;
  let fixture: ComponentFixture<SearchResultSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultSongComponent]
    });
    fixture = TestBed.createComponent(SearchResultSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
