import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Gender } from '@ds/contracts';

import { UserList } from '@/features/users/components/user-list/user-list.component';
import { UserService } from '@/features/users/services/user.service';

@Component({
  selector: 'app-users',
  imports: [
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    UserList,
  ],
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

  protected readonly selectedActive = signal<'ACTIVE' | 'INACTIVE' | 'ALL'>('ALL');
  protected readonly selectedGender = signal<Gender | 'ALL'>('ALL');

  protected readonly users = computed(() => {
    const value = this.#resource.value();

    // Filter by active status
    const selectedActive = this.selectedActive();
    const users = value.filter(user => {
      if (selectedActive === 'ALL') {
        return true;
      }
      return selectedActive === 'ACTIVE' ? user.isActive : !user.isActive;
    });

    // Filter by gender
    const gender = this.selectedGender();
    if (gender === 'ALL') {
      return users;
    }
    return users.filter(user => user.gender === gender);
  });

  protected get isLoading() {
    return this.#resource.isLoading;
  }

  toggleActiveUsers() {
    this.selectedActive.set(this.selectedActive() === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
  }
}
