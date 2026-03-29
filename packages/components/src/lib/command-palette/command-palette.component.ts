import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-command-palette',
  imports: [],
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPalette {}
