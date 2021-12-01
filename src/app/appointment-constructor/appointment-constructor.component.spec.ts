import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentConstructorComponent } from './appointment-constructor.component';

describe('AppointmentConstructorComponent', () => {
  let component: AppointmentConstructorComponent;
  let fixture: ComponentFixture<AppointmentConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
