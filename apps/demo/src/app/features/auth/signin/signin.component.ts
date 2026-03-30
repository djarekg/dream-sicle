import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '@/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Signin {
  readonly #service = inject(AuthService);

  readonly #model = signal({
    email: '',
    password: '',
  });

  protected readonly form = form(this.#model);

  protected async onSubmit() {
    await this.#service.signin(this.#model().email, this.#model().password);
  }
}
