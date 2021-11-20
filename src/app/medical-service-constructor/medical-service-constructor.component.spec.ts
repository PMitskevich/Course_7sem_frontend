import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceConstructorComponent } from './medical-service-constructor.component';

describe('MedicalServiceConstructorComponent', () => {
  let component: MedicalServiceConstructorComponent;
  let fixture: ComponentFixture<MedicalServiceConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalServiceConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalServiceConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
