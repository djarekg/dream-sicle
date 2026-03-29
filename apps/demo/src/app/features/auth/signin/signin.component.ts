import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Signin {}
