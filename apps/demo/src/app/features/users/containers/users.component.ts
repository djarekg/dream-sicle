import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
} from '@angular/core';

import { UserList } from '@/features/users/components/user-list/user-list';
import { UserService } from '@/features/users/services/user.service';

@Component({
  selector: 'app-users',
  imports: [UserList],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Users {
  readonly #service = inject(UserService);
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getUsers(),
  });

  get users() {
    return this.#resource.value;
  }

  get isLoading() {
    return this.#resource.isLoading;
  }

  refresh() {
    this.#resource.reload();
  }
}
