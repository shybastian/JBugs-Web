import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class NotifierComponent implements OnInit, OnDestroy {

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
   * @param {UserService} userService
   * @param {StorageService} storageService
   * @param {TranslateService} translate
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

  /**
   * When this component is initialized,
   * this function is called.
   * It initializes the intervalsubscriptions and shows the notifications of the day for he current user
   */
  ngOnInit(): void {
    debugger;
    const source = interval(5000);
    if (!(sessionStorage.getItem("alreadyLoggedInUser") === "true")) {
      sessionStorage.setItem("alreadyLoggedInUser", "true");
      this.lastNotificationId = 0;
      this.getTodayNotifications();
      this.subscription = source.subscribe(val => this.getNewNotifications());
    }
  }

  /**
   * When this component is called,
   * it requests today notifications for the current user from the server and than
   * show them
   */
  public getTodayNotifications() {
    this.userService.getUserTodayNotifications(this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username)
      .subscribe(notifications => {
        for (let notification of notifications) {
          if (notification.id > this.lastNotificationId)
            this.lastNotificationId = notification.id;
          this.showNotificationByType(notification);
        }
      }, Error => {
        alert(this.translate.instant("NOTIFICATIONS.ERROR"))
      });
  }

  /**
   * When this component is called,
   * it requests teh new notifications for the current user from the server and than
   * show them
   */
  private getNewNotifications() {
    debugger;
    if (sessionStorage.getItem("alreadyLoggedInUser") === "true") {
      this.userService.getUserNewNotifications(this.storageService.getUserWithoutIdRolesCounterStatusFromSessionStorage().username, this.lastNotificationId)
        .subscribe(notifications => {
          for (let notification of notifications) {
            if (notification.id > this.lastNotificationId)
              this.lastNotificationId = notification.id;
            this.showNotificationByType(notification);
          }
        }, Error => {
          alert(this.translate.instant("NOTIFICATIONS.ERROR"));
        });
    }
  }

  /**
   * When this component is called,
   * it shows the notification using the correspondent background to the notification type
   *
   * @param {Notification} notification
   */
  showNotificationByType(notification: Notification) {
    if (notification.type == NotificationType.BUG_CLOSED || notification.type == NotificationType.BUG_STATUS_UPDATED
      || notification.type == NotificationType.BUG_UPDATED)
      this.showNotification("warning", this.translate.instant("NOTIFICATIONS." + notification.type));
    else
      this.showNotification("info", this.translate.instant("NOTIFICATIONS." + notification.type));
  }

  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }
}

