import { TestBed } from '@angular/core/testing';

import { ServicioColumnaService } from './servicio-columna.service';

describe('ServicioColumnaService', () => {
  let service: ServicioColumnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioColumnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
