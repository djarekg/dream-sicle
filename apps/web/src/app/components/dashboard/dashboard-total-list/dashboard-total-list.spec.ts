import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalList } from './dashboard-total-list';

describe('DashboardTotalList', () => {
  let component: DashboardTotalList;
  let fixture: ComponentFixture<DashboardTotalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalList],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTotalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});