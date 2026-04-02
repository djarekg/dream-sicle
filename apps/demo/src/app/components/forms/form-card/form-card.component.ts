import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-card',
  imports: [MatCardModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCard {
  readonly title = input.required<string>();
}
