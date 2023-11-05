import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerContentComponent } from './container-content.component';

describe('ContainerContentComponent', () => {
  let component: ContainerContentComponent;
  let fixture: ComponentFixture<ContainerContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerContentComponent]
    });
    fixture = TestBed.createComponent(ContainerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
