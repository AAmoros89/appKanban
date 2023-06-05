import { TestBed } from '@angular/core/testing';

import { ServicioTableroService } from './servicio-tablero.service';

describe('ServicioTableroService', () => {
  let service: ServicioTableroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTableroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
