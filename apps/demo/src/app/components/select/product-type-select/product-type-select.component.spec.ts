import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductTypeSelect } from "./product-type-select.component";

describe("ProductTypeSelect", () => {
  let component: ProductTypeSelect;
  let fixture: ComponentFixture<ProductTypeSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTypeSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTypeSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
