import { Component, inject, resource, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { isNotEmpty } from '@ds/utils';

import { Spinner } from '@/components/spinner/spinner';
import { FormMode } from '@/core/constants/form-mode';
import { UserDetail } from '@/features/users/components/user-detail/user-detail';
import type { UserFormModel } from '@/features/users/forms/user-form.model';
import { UserService } from '@/features/users/services/user.service';

@Component({
  selector: 'app-user',
  imports: [Spinner, UserDetail],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export default class User {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #service = inject(UserService);
  readonly #snackbar = inject(MatSnackBar);
  readonly #userId = signal<string | null>(null);

  protected readonly mode = signal<FormMode>(FormMode.view);

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
    this.#route.queryParams.subscribe(params => {
      const mode = (Number(params['mode']) || FormMode.view) as FormMode;
      this.mode.set(mode);
    });

    this.#route.paramMap.subscribe(params => {
      this.#userId.set(params.get('id'));
    });
  }

  protected onNew() {
    this.#navigateToUser(FormMode.new);
  }

  protected onEdit() {
    this.#navigateToUser(FormMode.edit);
  }

  protected onCancel() {
    this.#navigateToUser(FormMode.view);
  }

  protected async onSave(user: UserFormModel) {
    if (this.mode() === FormMode.edit) {
      await this.#service.updateUser(user);
    } else {
      const { id } = await this.#service.createUser(user);
      this.#router.navigate(['/users', id]);
    }

    // Reset mode
    this.mode.set(FormMode.view);

    this.#snackbar.open('User updated successfully', 'OK', {
      duration: 3000,
      panelClass: 'app-snackbar-success',
    });
  }

  #navigateToUser(mode: FormMode) {
    // If canceling creating new user, navigate back to users route.
    if (mode === FormMode.view && this.mode() === FormMode.new) {
      this.#router.navigate(['/users']);
      return;
    }

    if (mode === FormMode.new) {
      this.#router.navigate(['/users', 0], { queryParams: { mode: FormMode.new } });
      return;
    }

    const urlTree = this.#router.createUrlTree([], {
      relativeTo: this.#route,
      queryParams: {
        mode,
      },
      queryParamsHandling: 'merge',
    });

    this.#router.navigateByUrl(urlTree);
  }
}
