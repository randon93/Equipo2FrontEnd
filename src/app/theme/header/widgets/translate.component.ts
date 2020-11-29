import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@core';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
})
export class TranslateComponent {
  langs = {
    'es-ES': 'Español',
    'en-US': 'English',
  };

  constructor(private translate: TranslateService, private settings: SettingsService) {
    translate.addLangs(['en-US', 'es-ES']);
    translate.setDefaultLang('es-ES');

    const browserLang = navigator.language;
    translate.use(browserLang.match(/en-US|es-Es/) ? browserLang : 'es-ES');
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
