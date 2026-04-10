import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import type { ProductDto } from '@ds/contracts';

@Component({
  selector: 'app-product-detail',
  imports: [DatePipe, MatCardModule, MatChipsModule, MatDividerModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetail {
  readonly product = input.required<ProductDto>();
}
