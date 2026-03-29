import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-signin',
  imports: [FormField, MatFormFieldModule, MatInputModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Signin {
  readonly #model = signal({
    email: '',
    password: '',
  });

  protected readonly form = form(this.#model);

  protected onSubmit() {
    console.log('Email:', this.#model().email);
    console.log('Password:', this.#model().password);
  }
}
