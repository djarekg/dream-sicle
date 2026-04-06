import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from "@angular/core";
import { apply, disabled, form, FormField, submit } from "@angular/forms/signals";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserDto } from "@ds/contracts";

import { FormCard } from "@/components/forms/form-card/form-card.component";
import { Form } from "@/components/forms/form/form.component";
import { GenderSelect, StateSelect } from "@/components/select";
import { FormMode } from "@/core/constants/form-mode";
import { userSchema } from "@/features/users/forms";
import type { UserFormModel } from "@/features/users/forms/user-form.model";

@Component({
  selector: "app-user-detail",
  imports: [
    Form,
    FormCard,
    FormField,
    GenderSelect,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    StateSelect,
  ],
  templateUrl: "./user-detail.component.html",
  styleUrl: "./user-detail.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetail {
  readonly #user = linkedSignal<UserFormModel>(() => {
    const {
      id,
      firstName,
      lastName,
      gender,
      email,
      phone,
      streetAddress,
      streetAddress2,
      city,
      stateId,
      zip,
      isActive,
      jobTitle,
      imageId,
      dateUpdated,
    } = this.user();

    return {
      id,
      firstName,
      lastName,
      gender,
      email,
      phone,
      streetAddress,
      streetAddress2: streetAddress2 ?? "",
      city,
      stateId,
      zip,
      isActive,
      jobTitle,
      imageId,
      dateUpdated,
    };
  });

  readonly user = input.required<UserDto>();
  readonly mode = input<FormMode>(FormMode.view);
  readonly cancel = output();
  readonly edit = output();
  readonly new = output();
  readonly save = output<UserFormModel>();

  protected readonly isEditing = computed(() => this.mode() !== FormMode.view);
  protected readonly readonly = computed(() => this.mode() === FormMode.new);
  protected readonly form = form(this.#user, (path) => {
    apply(path, userSchema);
    disabled(path, () => !this.isEditing());
  });

  protected onFormChange(mode: FormMode) {
    switch (mode) {
      case FormMode.cancel:
        this.cancel.emit();
        break;
      case FormMode.edit:
        this.edit.emit();
        break;
      case FormMode.new:
        this.new.emit();
        break;
      case FormMode.save:
        this.onSave();
        break;
    }
  }

  protected async onSave() {
    await submit(this.form, {
      action: async (f) => {
        try {
          this.save.emit(f().value());
          return [];
        } catch (err) {
          console.error("Failed to save user", err);
          return [
            {
              kind: "userSaveError",
              message: "Failed to save user",
            },
          ];
        }
      },
    });
  }
}
