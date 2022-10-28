import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { PlayerListComponent } from './components/player-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StatActionsComponent } from './components/stat-actions.component';
import { StatItemListComponent } from './components/statitem-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    StatActionsComponent,
    StatItemListComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
