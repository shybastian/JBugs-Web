import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from "./user-management/login/services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing';

  // displayLogOutButton: boolean;


  constructor(public translate: TranslateService, private storageService: StorageService) {
    this.switchLanguage();
  }

  private switchLanguage() {
    this.translate.addLangs(['en', 'ro']);
    this.translate.setDefaultLang('en');
  }

}
