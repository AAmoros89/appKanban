import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTableroComponent } from './crear-tablero.component';

describe('CrearTableroComponent', () => {
  let component: CrearTableroComponent;
  let fixture: ComponentFixture<CrearTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTableroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
