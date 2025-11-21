import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRatingsComponent } from './my-ratings.component';

describe('MyRatingsComponent', () => {
  let component: MyRatingsComponent;
  let fixture: ComponentFixture<MyRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRatingsComponent]
    });
    fixture = TestBed.createComponent(MyRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
