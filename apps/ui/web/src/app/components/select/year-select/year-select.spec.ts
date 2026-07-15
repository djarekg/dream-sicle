import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelect } from './year-select';

describe('YearSelect', () => {
  let component: YearSelect;
  let fixture: ComponentFixture<YearSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(YearSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
