import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { PlayerListComponent } from './components/player-list.component';
import {MatButtonModule} from '@angular/material/button';
import { StatActionsComponent } from './components/stat-actions.component';
import { StatItemListComponent } from './components/statitem-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    StatActionsComponent,
    StatItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
