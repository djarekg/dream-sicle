import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  form,
  FormField,
  submit,
  type ValidationError,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '@/core/auth/auth.service';
import { signinSchema } from '@/features/auth/signin/signin.schema';

const ERROR_MSG_SIGNIN_FAILED = 'Failed to login with email and password';

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

  protected readonly errorMessage = signal<string | null>(null);
  protected readonly form = form(this.#model, signinSchema);

  protected async onSubmit(e: Event) {
    e.preventDefault();

    submit(this.form, {
      action: async f => {
        const errors: ValidationError[] = [];
        const { email, password } = f().value();

        try {
          if (!(await this.#service.signin(email, password))) {
            throw new Error('Invalid credentials');
          }
        } catch (err) {
          console.error(ERROR_MSG_SIGNIN_FAILED, err);

          this.errorMessage.set(ERROR_MSG_SIGNIN_FAILED);

          errors.push({
            kind: 'authenticationError',
            message: ERROR_MSG_SIGNIN_FAILED,
          });
        }

        this.errorMessage.set(null);

        return errors;
      },
    });
  }
}
