import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {interval, Subscription} from 'rxjs';
import {UserService} from "../../../user-management/services/user.service";
import {StorageService} from "../../../user-management/login/services/storage.service";
import {Notification, NotificationType} from "../../models/notification.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  subscription: Subscription;
  intervalId: number;

  lastNotificationId: number;

  /**
   * Notifier service
   */
  private notifier: NotifierService;

  /**
   * Constructor
   *
   * @param {NotifierService} notifier Notifier service
   */
  public constructor(notifier: NotifierService, private userService: UserService, private storageService: StorageService, private translate: TranslateService) {
    this.notifier = notifier;
  }

  /**
   * Show a notification
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   */
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  /**
   * Hide oldest notification
   */
  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  /**
   * Hide newest notification
   */
  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  /**
   * Hide all notifications at once
   */
  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  /**
   * Show a specific notification (with a custom notification ID)
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   * @param {string} id      Notification ID
   */
  public showSpecificNotification(type: string, message: string, id: string): void {
    this.notifier.show({
      id,
      message,
      type
    });
  }

  /**
   * Hide a specific notification (by a given notification ID)
   *
   * @param {string} id Notification ID
   */
  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }

  ngOnInit(): void {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.getNewNotifications());
    this.lastNotificationId = 0;
    this.getTodayNotifications();
  }

  private getTodayNotifications() {
    this.userService.getUserTodayNotifications(this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username)
      .subscribe(notifications => {
        for (let notification of notifications) {
          if (notification.id > this.lastNotificationId)
            this.lastNotificationId = notification.id;
          this.showNotificationByType(notification);
        }
      }, Error => {
        alert("Notifications error!");
      });
  }

  private getNewNotifications() {
    this.userService.getUserNewNotifications(this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username, this.lastNotificationId)
      .subscribe(notifications => {
        for (let notification of notifications) {
          if (notification.id > this.lastNotificationId)
            this.lastNotificationId = notification.id;
          this.showNotificationByType(notification);
        }
      }, Error => {
        alert("Notifications error!");
      });
  }

  showNotificationByType(notification: Notification) {
    if (notification.type == NotificationType.BUG_CLOSED || notification.type == NotificationType.BUG_STATUS_UPDATED
      || notification.type == NotificationType.BUG_UPDATED)
      this.showNotification("warning", this.translate.instant("NOTIFICATIONS." + notification.type));
    else
      this.showNotification("success", this.translate.instant("NOTIFICATIONS." + notification.type));
  }
}

