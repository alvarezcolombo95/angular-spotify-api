import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSongComponent } from './detail-song.component';

describe('DetailSongComponent', () => {
  let component: DetailSongComponent;
  let fixture: ComponentFixture<DetailSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSongComponent]
    });
    fixture = TestBed.createComponent(DetailSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
