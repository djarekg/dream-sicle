import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCell } from './grid-cell';

describe('GridCell', () => {
  let component: GridCell;
  let fixture: ComponentFixture<GridCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCell],
    }).compileComponents();

    fixture = TestBed.createComponent(GridCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
