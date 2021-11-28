import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConstructorComponent } from './doctor-constructor.component';

describe('DoctorConstructorComponent', () => {
  let component: DoctorConstructorComponent;
  let fixture: ComponentFixture<DoctorConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
