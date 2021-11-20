import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceComponent } from './medical-service.component';

describe('MedicalServiceComponent', () => {
  let component: MedicalServiceComponent;
  let fixture: ComponentFixture<MedicalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
