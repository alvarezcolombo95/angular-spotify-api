import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerResultsComponent } from './container-results.component';

describe('ContainerResultsComponent', () => {
  let component: ContainerResultsComponent;
  let fixture: ComponentFixture<ContainerResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerResultsComponent]
    });
    fixture = TestBed.createComponent(ContainerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
