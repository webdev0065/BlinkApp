// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Component, OnInit, OnDestroy, inject, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ToastaService, ToastaConfig, ToastOptions, ToastData, ToastaModule } from 'ngx-toasta';
import { NgbCollapseModule, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { AlertService, AlertDialog, DialogType, AlertCommand, MessageSeverity } from './services/alert.service';
import { NotificationService } from './services/notification.service';
import { AppTranslationService } from './services/app-translation.service';
import { AccountService } from './services/account.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AppTitleService } from './services/app-title.service';
import { AuthService } from './services/auth.service';
import { ConfigurationService } from './services/configuration.service';
import { Alertify } from './models/Alertify';
import { Permissions } from './models/permission.model';
import { LoginComponent } from './components/login/login.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';

declare let alertify: Alertify;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        ToastaModule, RouterLink, RouterLinkActive, NgbCollapseModule, NgbPopover, NotificationsViewerComponent,
        RouterOutlet, TranslateModule
    ]
})
export class AppComponent implements OnInit, OnDestroy {
  private toastaService = inject(ToastaService);
  private toastaConfig = inject(ToastaConfig);
  private accountService = inject(AccountService);
  private alertService = inject(AlertService);
  private modalService = inject(NgbModal);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);
  private translationService = inject(AppTranslationService);
  configurations = inject(ConfigurationService);
  router = inject(Router);
  renderer = inject(Renderer2);

  isMenuCollapsed = true;
  isAppLoaded = false;
  isUserLoggedIn = false;
  newNotificationCount = 0;
  appTitle = 'QuickApp';

  stickyToasties: number[] = [];

  dataLoadingConsecutiveFailures = 0;
  notificationsLoadingSubscription: Subscription | undefined;
  languageChangedSubscription: Subscription | undefined;

  loginControl: LoginComponent | undefined;

  gT = (key: string | string[], interpolateParams?: object) =>
    this.translationService.getTranslation(key, interpolateParams);

  get notificationsTitle() {
    if (this.newNotificationCount) {
      return `${this.gT('app.Notifications')} (${this.newNotificationCount} ${this.gT('app.New')})`;
    } else {
      return this.gT('app.Notifications');
    }
  }

  constructor() {
    const storageManager = inject(LocalStoreManager);

    storageManager.initialiseStorageSyncListener();

    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.toastaConfig.limit = 100;
    this.toastaConfig.showClose = true;
    this.toastaConfig.showDuration = false;

    AppTitleService.appName = this.appTitle;
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn;

    // Extra sec to display preboot loaded information
    setTimeout(() => this.isAppLoaded = true, 1000);

    setTimeout(() => {
      if (this.isUserLoggedIn) {
        this.alertService.resetStickyMessage();
        this.alertService.showMessage(this.gT('app.alerts.Login'), this.gT('app.alerts.WelcomeBack',
          { username: this.userName }), MessageSeverity.default);
      }
    }, 2000);

    this.languageChangedSubscription = this.translationService.languageChanged$
      .subscribe(event => {
        this.renderer.setAttribute(document.documentElement, 'dir', event.lang === 'ar' ? 'rtl' : 'ltr');
        this.renderer.setAttribute(document.documentElement, 'lang', event.lang);
      });

    this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));
    this.alertService.getMessageEvent().subscribe(message => this.showToast(message));

    this.authService.reLoginDelegate = () => this.openLoginModal();

    this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
      this.isUserLoggedIn = isLoggedIn;

      if (this.isUserLoggedIn) {
        this.initNotificationsLoading();
      } else {
        this.unsubscribeNotifications();
      }

      setTimeout(() => {
        if (!this.isUserLoggedIn) {
          this.alertService.showMessage(this.gT('app.alerts.SessionEnded'), '', MessageSeverity.default);
        }
      }, 500);
    });
  }

  ngOnDestroy() {
    this.unsubscribeNotifications();
    this.languageChangedSubscription?.unsubscribe();
  }

  private unsubscribeNotifications() {
    this.notificationsLoadingSubscription?.unsubscribe();
  }

  initNotificationsLoading() {
    this.notificationsLoadingSubscription = this.notificationService.getNewNotificationsPeriodically()
      .subscribe({
        next: notifications => {
          this.dataLoadingConsecutiveFailures = 0;
          this.newNotificationCount = notifications.filter(n => !n.isRead).length;
        },
        error: error => {
          this.alertService.logError(error);

          if (this.dataLoadingConsecutiveFailures++ < 20) {
            setTimeout(() => this.initNotificationsLoading(), 5000);
          } else {
            this.alertService.showStickyMessage(this.gT('app.alerts.LoadingError'),
              this.gT('app.alerts.LoadingNewNotificationsFailed'), MessageSeverity.error);
          }
        }
      });
  }

  markNotificationsAsRead() {
    const newNotifications = this.notificationService.newNotifications;

    if (newNotifications) {
      this.notificationService.readUnreadNotification(newNotifications.map(n => n.id), true)
        .subscribe({
          next: () => {
            for (const n of newNotifications) {
              n.isRead = true;
            }

            this.newNotificationCount = newNotifications.filter(n => !n.isRead).length;
          },
          error: error => {
            this.alertService.logError(error);
            this.alertService.showMessage(this.gT('app.alerts.NotificationError'),
              this.gT('app.alerts.MarkingReadNotificationsFailed'), MessageSeverity.error);
          }
        });
    }
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      windowClass: 'login-control',
      modalDialogClass: 'h-75 d-flex flex-column justify-content-center my-0',
      size: 'lg',
      backdrop: 'static'
    });

    this.loginControl = modalRef.componentInstance as LoginComponent;
    this.loginControl.isModal = true;

    this.loginControl.modalClosedCallback = () => modalRef.close();

    modalRef.shown.subscribe(() => {
      this.alertService.showStickyMessage(this.gT('app.alerts.SessionExpired'),
        this.gT('app.alerts.SessionExpiredLoginAgain'), MessageSeverity.info);
    });

    modalRef.hidden.subscribe(() => {
      this.alertService.resetStickyMessage();
      this.loginControl?.reset();

      if (this.authService.isSessionExpired) {
        this.alertService.showStickyMessage(this.gT('app.alerts.SessionExpired'),
          this.gT('app.alerts.SessionExpiredLoginToRenewSession'), MessageSeverity.warn);
      }
    });
  }

  showDialog(dialog: AlertDialog) {
    alertify.set({
      labels: {
        ok: dialog.okLabel || this.gT('app.alerts.OK'),
        cancel: dialog.cancelLabel || this.gT('app.alerts.Cancel')
      }
    });

    switch (dialog.type) {
      case DialogType.alert:
        alertify.alert(dialog.message);
        break;
      case DialogType.confirm:
        alertify.confirm(dialog.message, ok => {
          if (ok) {
            if (dialog.okCallback)
              dialog.okCallback();
          } else {
            if (dialog.cancelCallback) {
              dialog.cancelCallback();
            }
          }
        });
        break;
      case DialogType.prompt:
        alertify.prompt(dialog.message, (ok, val) => {
          if (ok) {
            if (dialog.okCallback)
              dialog.okCallback(val);
          } else {
            if (dialog.cancelCallback) {
              dialog.cancelCallback();
            }
          }
        }, dialog.defaultValue);
        break;
    }
  }

  showToast(alert: AlertCommand) {
    if (alert.operation === 'clear') {
      for (const id of this.stickyToasties.slice(0)) {
        this.toastaService.clear(id);
      }
      return;
    }

    const toastOptions: ToastOptions = {
      title: alert.message?.summary,
      msg: alert.message?.detail,
    };

    if (alert.operation === 'add_sticky') {
      toastOptions.timeout = 0;

      toastOptions.onAdd = (toast: ToastData) => {
        this.stickyToasties.push(toast.id);
      };

      toastOptions.onRemove = (toast: ToastData) => {
        const index = this.stickyToasties.indexOf(toast.id, 0);

        if (index > -1) {
          this.stickyToasties.splice(index, 1);
        }

        if (alert.onRemove) {
          alert.onRemove();
        }

        toast.onAdd = undefined;
        toast.onRemove = undefined;
      };
    } else {
      toastOptions.timeout = 4000;
    }

    switch (alert.message?.severity) {
      case MessageSeverity.default: this.toastaService.default(toastOptions); break;
      case MessageSeverity.info: this.toastaService.info(toastOptions); break;
      case MessageSeverity.success: this.toastaService.success(toastOptions); break;
      case MessageSeverity.error: this.toastaService.error(toastOptions); break;
      case MessageSeverity.warn: this.toastaService.warning(toastOptions); break;
      case MessageSeverity.wait: this.toastaService.wait(toastOptions); break;
    }
  }

  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  getYear() {
    return new Date().getUTCFullYear();
  }

  get userName(): string {
    return this.authService.currentUser?.userName ?? '';
  }

  get fullName(): string {
    return this.authService.currentUser?.fullName ?? '';
  }

  get canViewCustomers() {
    return this.accountService.userHasPermission(Permissions.viewUsers); // eg. viewCustomersPermission
  }

  get canViewProducts() {
    return this.accountService.userHasPermission(Permissions.viewUsers); // eg. viewProductsPermission
  }

  get canViewOrders() {
    return !!true; // eg. viewOrdersPermission
  }
}
