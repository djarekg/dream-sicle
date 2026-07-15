import type { ProductDto } from '@/features/products/models/product.model';
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-detail',
  imports: [DatePipe, MatCardModule, MatChipsModule, MatDividerModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  readonly product = input.required<ProductDto>();
}
