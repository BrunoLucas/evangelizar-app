import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {ListaPessoaPage} from '../pages/lista-pessoa/lista-pessoa';

import {DataBaseProvider} from '../providers/data-base-provider'

@Component({
  templateUrl : 'app.html'
})
export class MyApp {
  rootPage:any = ListaPessoaPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dataBaseProvider : DataBaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('init database');
     
      dataBaseProvider.init().then(res =>{  
          console.log('concluido init database');
      }).catch(err => {
          console.log('erro : ' + err);
      });

    });
  }
}
