import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { GameComponent } from './components/game/game.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { StatActionsComponent } from './components/stat-actions/stat-actions.component';
import { StatItemListComponent } from './components/statitem-list/statitem-list.component';
import { PlayerSubComponent } from './components/player-sub/player-sub.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    StatActionsComponent,
    StatItemListComponent,
    GameComponent,
    PlayerSubComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
