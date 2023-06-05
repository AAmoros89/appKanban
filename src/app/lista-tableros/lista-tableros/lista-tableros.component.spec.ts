import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTablerosComponent } from './lista-tableros.component';

describe('ListaTablerosComponent', () => {
  let component: ListaTablerosComponent;
  let fixture: ComponentFixture<ListaTablerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTablerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
