import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSesionComponent } from './no-sesion.component';

describe('NoSesionComponent', () => {
  let component: NoSesionComponent;
  let fixture: ComponentFixture<NoSesionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoSesionComponent]
    });
    fixture = TestBed.createComponent(NoSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
