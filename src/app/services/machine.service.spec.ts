import { TestBed } from '@angular/core/testing';

import { MachinePartService } from './machine.service';

describe('MachinePartService', () => {
  let service: MachinePartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachinePartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
