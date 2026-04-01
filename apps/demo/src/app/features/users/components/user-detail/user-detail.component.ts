import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UserDto } from '@ds/contracts';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetail {
  readonly user = input.required<UserDto>();
}
