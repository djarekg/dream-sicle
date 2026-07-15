import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '@/components/layout/header/header';
import { SettingsNav } from '@/components/settings-nav/settings-nav';

@Component({
  imports: [Header, RouterOutlet, SettingsNav],
  templateUrl: './protected-layout.html',
  styleUrl: './protected-layout.css',
  host: {
    class: 'app-scroll-track-transparent',
  },
})
export default class ProtectedLayout {
  protected readonly isOpened = signal(false);
}
