import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing';

  constructor(public translate: TranslateService) {
    this.switchLanguage();
  }

  private switchLanguage() {
    this.translate.addLangs(['en', 'ro']);
    this.translate.setDefaultLang('en');
  }

}
