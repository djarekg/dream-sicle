import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import { TitleService } from '@/core/services/title.service.js';

@Component({
  imports: [RouterOutlet],
  templateUrl: './unprotected-layout.component.html',
  styleUrl: './unprotected-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UnprotectedLayout {
  // readonly #titleService = inject(TitleService);
  // protected readonly title = this.#titleService.title;
}
