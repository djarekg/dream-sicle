import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts unauthenticated without blocking route guards', () => {
    expect(service.isAuthenticating()).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('resets to unauthenticated on signout', async () => {
    await service.signin();
    expect(service.isAuthenticated()).toBeTrue();

    await service.signout();

    expect(service.isAuthenticating()).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
