import { TestBed } from '@angular/core/testing';

import { CommonFunctions } from './common-functions';

describe('CommonFunctions', () => {
  let service: CommonFunctions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFunctions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
