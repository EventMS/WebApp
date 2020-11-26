import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleNearbyService } from './services/GoogleNearby/google-nearby.service';
import { PermissionType, Plugins } from '@capacitor/core';

const { Permissions } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private googleNearby: GoogleNearbyService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('capacitor')) {
        await this.googleNearby.init();
        if ((await Permissions.query({ name: PermissionType.Microphone })).state === 'prompt') {
          await this.googleNearby.initPermissions();
        }
      }
    });
  }
}
