import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDto } from '@ds/contracts';

import { ProductTable } from './product-table';

const createProduct = (id: string, name: string): ProductDto => ({
  id,
  name,
  description: `${name} description`,
  price: '10.00',
  gender: 'MALE',
  productType: 'SHIRT',
  isActive: true,
  dateCreated: '2026-01-01T00:00:00.000Z',
  dateUpdated: '2026-01-01T00:00:00.000Z',
});

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort products by name when the header button is clicked', () => {
    fixture.componentRef.setInput('products', [
      createProduct('2', 'Zebra Jacket'),
      createProduct('1', 'Alpha Shirt'),
    ]);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const getNames = () =>
      Array.from(host.querySelectorAll<HTMLElement>('tbody tr td:first-child')).map(
        cell => cell.textContent?.trim() ?? '',
      );

    expect(getNames()).toEqual(['Zebra Jacket', 'Alpha Shirt']);

    const sortButton = host.querySelector<HTMLButtonElement>('th button');
    expect(sortButton).not.toBeNull();
    if (!sortButton) {
      throw new Error('Sort button not found');
    }
    sortButton.click();
    fixture.detectChanges();

    expect(getNames()).toEqual(['Alpha Shirt', 'Zebra Jacket']);
  });
});
