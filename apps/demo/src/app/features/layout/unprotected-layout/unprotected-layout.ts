import { TitleService } from '@/core/services/title.service.js';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unprotected-layout',
  imports: [RouterOutlet],
  templateUrl: './unprotected-layout.html',
  styleUrl: './unprotected-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UnprotectedLayout {
  readonly #titleService = inject(TitleService);
  protected readonly title = this.#titleService.title;
}
