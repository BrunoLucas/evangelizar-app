import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {PessoaPage} from '../pages/pessoa/pessoa';
import {ListaPessoaPage} from '../pages/lista-pessoa/lista-pessoa';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';

import {DataBaseProvider} from '../providers/data-base-provider'

@NgModule({
  declarations: [
    MyApp,
    PessoaPage,
    ListaPessoaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PessoaPage,
    ListaPessoaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataBaseProvider,SQLite
  ]
  
})
export class AppModule {}
