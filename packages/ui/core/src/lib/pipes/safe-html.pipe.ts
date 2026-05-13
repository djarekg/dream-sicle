import { inject, Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  #sanitizer = inject(DomSanitizer);

  transform(value: string) {
    return this.#sanitizer.bypassSecurityTrustHtml(value);
  }
}
