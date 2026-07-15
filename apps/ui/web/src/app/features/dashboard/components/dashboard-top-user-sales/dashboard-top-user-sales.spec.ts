import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopUserSales } from './dashboard-top-user-sales';

describe('DashboardTopUserSales', () => {
  let component: DashboardTopUserSales;
  let fixture: ComponentFixture<DashboardTopUserSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopUserSales],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTopUserSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
