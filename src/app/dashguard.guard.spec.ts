import { TestBed } from '@angular/core/testing';

import { DashguardGuard } from './dashguard.guard';

describe('DashguardGuard', () => {
  let guard: DashguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
