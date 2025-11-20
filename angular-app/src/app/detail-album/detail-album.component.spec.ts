import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlbumComponent } from './detail-album.component';

describe('DetailAlbumComponent', () => {
  let component: DetailAlbumComponent;
  let fixture: ComponentFixture<DetailAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlbumComponent]
    });
    fixture = TestBed.createComponent(DetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
