import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserDto } from '@ds/contracts';

@Component({
  selector: 'app-user-list',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  readonly users = input.required<UserDto[]>();
}
