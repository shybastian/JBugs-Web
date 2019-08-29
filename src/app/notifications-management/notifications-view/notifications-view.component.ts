import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../user-management/login/services/storage.service";
import {UserService} from "../../user-management/services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {Notification} from "../models/notification.model";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss'],
  providers: [MessageService]
})
export class NotificationsViewComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private storageService: StorageService, private userService: UserService, private translate: TranslateService) {
  }

  /**
   * When this component is initialized,
   * this function is called.
   * It initializes the values of the notifications in the table
   */
  ngOnInit() {
    this.userService.getUserNotifications(this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username)
      .subscribe(notifications => {
        this.notifications = notifications;
      }, Error => {
        alert(this.translate.instant("NOTIFICATIONS_VIEW.ERROR"));
      });
  }

}
