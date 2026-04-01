import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNotEmpty } from '@ds/utils';

import { Spinner } from '@/components/spinner/spinner.component';
import { UserDetail } from '@/features/users/components/user-detail/user-detail.component';
import { UserService } from '@/features/users/services/user.service';

@Component({
  selector: 'app-user',
  imports: [Spinner, UserDetail],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class User {
  readonly #route = inject(ActivatedRoute);
  readonly #service = inject(UserService);
  readonly #userId = signal<string | null>(null);

  protected readonly resource = resource({
    params: () => this.#userId(),
    loader: ({ params: id }) => {
      if (isNotEmpty(id)) {
        return this.#service.getUser(id);
      }

      return Promise.resolve(null);
    },
  });

  constructor() {
    this.#route.paramMap.subscribe(params => {
      this.#userId.set(params.get('id'));
    });
  }
}
