import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormMode } from '@/core/constants/form-mode';

@Component({
  selector: 'app-form',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  readonly mode = input<FormMode>(FormMode.view);
  readonly change = output<FormMode>();

  protected readonly isEditing = computed(() => this.mode() !== FormMode.view);
  protected readonly isNew = computed(() => this.mode() === FormMode.new);

  protected onCancel() {
    this.change.emit(FormMode.cancel);
  }

  protected onEdit() {
    this.change.emit(FormMode.edit);
  }

  protected onNew() {
    this.change.emit(FormMode.new);
  }

  protected onSave(e: Event) {
    e.preventDefault();
    this.change.emit(FormMode.save);
  }
}
