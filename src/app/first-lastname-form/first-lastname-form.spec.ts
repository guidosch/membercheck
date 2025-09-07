import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLastnameForm } from './first-lastname-form';

describe('FirstLastnameForm', () => {
  let component: FirstLastnameForm;
  let fixture: ComponentFixture<FirstLastnameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLastnameForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLastnameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
