import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';

describe('BackendService', () => {
  // There are two ways to test this guy:
  // * Using Angular style tests (integration tests)
  // * Using isolated tests

  // Angular-Style Tests
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [BackendService]
  //   });
  // });
  //
  // it('should be created', inject([BackendService], (service: BackendService) => {
  //   expect(service).toBeTruthy();
  // }));

  // Isolated Tests
  // it('should be created', () => {
  //   const mockHttp = jasmine.createSpyObject('Http', ['get']);
  //   const backend = new BackendService(mockHttp);
  // }));
});
