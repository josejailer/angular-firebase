import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmpleadosComponent } from './add-edit-empleados.component';

describe('AddEditEmpleadosComponent', () => {
  let component: AddEditEmpleadosComponent;
  let fixture: ComponentFixture<AddEditEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
