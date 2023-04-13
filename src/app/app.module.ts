import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material/material.module'
import { SignupComponent } from './auth/signup/signup.component'
import { LoginComponent } from './auth/login/login.component'
import { TrainingComponent } from './training/training.component'
import { CurrentTrainingComponent } from './training/current-training/current-training.component'
import { NewTrainingComponent } from './training/new-training/new-training.component'
import { PastTrainingComponent } from './training/past-training/past-training.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { StopTrainingComponenet } from './training/current-training/stop-training.component'
import { AuthService } from './auth/auth.service'
import { TrainingService } from './training/training.service'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { firebase } from '../environments/firebase'
import { UIService } from './shared/ui.service'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponenet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponenet]
})
export class AppModule {}
