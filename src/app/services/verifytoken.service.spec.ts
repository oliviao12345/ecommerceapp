import { TestBed } from '@angular/core/testing';

import { VerifytokenService } from './verifytoken.service';

describe('VerifytokenService', () => {
  let service: VerifytokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifytokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
