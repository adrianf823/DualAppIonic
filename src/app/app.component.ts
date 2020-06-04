import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {AuthService} from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  logeado:boolean=false
  usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"));
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthService
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      if(localStorage.getItem("currentUser")){
        this.logeado=true
        console.log(this.logeado)
      }
    });
    this.initializeApp();
  }

  logOut(){
    this.authService.logoutUser().subscribe()
    this.router.navigateByUrl("/login")
    localStorage.setItem("deslogueado","1")
    localStorage.setItem("logeado","0")
    location.reload()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
