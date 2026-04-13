import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StateSelect } from "./state-select";

describe("StateSelectComponent", () => {
  let component: StateSelect;
  let fixture: ComponentFixture<StateSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(StateSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
