import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { PhoneService } from '../providers/phone-service/phone-service';

import { HttpModule } from '@angular/http';

import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import {Contacts, Contact} from '@ionic-native/contacts';
import { GroupByPipe } from '../pipes/group-by/group-by';
import { KeysPipe } from '../pipes/keys/keys';

import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    GroupByPipe,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode:'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,GlobalVarsProvider, PhoneService,
    UtilitiesProvider,
    Contacts,
    Contact,AndroidPermissions,
    Keyboard,File, FilePath
  ]
})

export class AppModule {
	
}
