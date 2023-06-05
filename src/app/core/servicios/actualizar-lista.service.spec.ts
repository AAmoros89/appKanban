import { TestBed } from '@angular/core/testing';

import { ActualizarListaService } from './actualizar-lista.service';

describe('ActualizarListaService', () => {
  let service: ActualizarListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
