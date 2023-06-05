import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearColumnaComponent } from './crear-columna.component';

describe('CrearColumnaComponent', () => {
  let component: CrearColumnaComponent;
  let fixture: ComponentFixture<CrearColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearColumnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
