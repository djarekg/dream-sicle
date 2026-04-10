import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '@/components/layout/header/header.component';
import { SettingsNav } from '@/components/settings-nav/settings-nav.component';

@Component({
  imports: [Header, RouterOutlet, SettingsNav],
  templateUrl: './protected-layout.component.html',
  styleUrl: './protected-layout.component.css',
  host: {
    class: 'app-scroll-track-transparent',
  },
})
export default class ProtectedLayout {
  protected readonly isOpened = signal(false);
}
