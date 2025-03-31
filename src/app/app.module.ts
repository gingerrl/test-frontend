import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModaDeleteComponent } from './components/moda-delete/moda-delete.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { MaterialModule } from './material/material.modules';
import { UserService } from './services/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TableListComponent,
    ModalUserComponent,
    ModaDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [provideAnimationsAsync(), UserService, NgEventBus],
  bootstrap: [AppComponent],
})
export class AppModule {}
