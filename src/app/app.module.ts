import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({
      "projectId":"w2h-app","appId":"1:278396831171:web:3a4455b3864374e891a976",
      "databaseURL":"https://w2h-app-default-rtdb.firebaseio.com",
      "storageBucket":"w2h-app.firebasestorage.app",
      "apiKey":"AIzaSyCzqepEmHDl_3RF463Is0Fs1-vT9T7xEMo",
      "authDomain":"w2h-app.firebaseapp.com",
      "messagingSenderId":"278396831171"})), 
    provideAuth(() => getAuth()), 
    provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
