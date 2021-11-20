import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationConstructorComponent } from './specialization-constructor.component';

describe('SpecializationConstructorComponent', () => {
  let component: SpecializationConstructorComponent;
  let fixture: ComponentFixture<SpecializationConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializationConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
