import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMainComponent } from './container-main.component';

describe('ContainerMainComponent', () => {
  let component: ContainerMainComponent;
  let fixture: ComponentFixture<ContainerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerMainComponent]
    });
    fixture = TestBed.createComponent(ContainerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
