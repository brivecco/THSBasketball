import { Component, ViewChild } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { GameAction } from '../models/gameAction';

import {map} from 'rxjs/operators';  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimationPlayer } from '@angular/animations';
import { StatItemListComponent } from './statitem-list.component';
import { PlayerListComponent } from './player-list.component';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("statItemPanel") statItemPanel:StatItemListComponent;
  @ViewChild("homeList") homeList:PlayerListComponent;
  @ViewChild("visitorList") visitorList:PlayerListComponent;

  title = 'THSBasketball';

  public schools : School[] = [
    {SchoolId:"tv1",Name:"Taylorville",Nickname:"Tornadoes"},
    {SchoolId:"mtz1",Name:"Mount Zion",Nickname:"Braves"}
  ]
    
  public game:Game=null;
  public currentPlayer:Player=null;
  public currentStatItem:StatItem=null;
  
  constructor(http:HttpClient,private svc:GameService) {

    this.setGameData(http);
    this.svc.GameMode=GameService.STATS_MODE;
  }

  private setGameData(h:HttpClient) {
    let t:Observable<Game>=h.get<Game>("assets/gameData.json")
    .pipe(map(g=>{
      g.HomeRoster=g.HomeRoster.map(p=>Object.assign(new Player(),p));
      g.VisitorRoster=g.VisitorRoster.map(p=>Object.assign(new Player(),p));
      g.StatItems=g.StatItems.map(si=>Object.assign(new StatItem(),si));
      return g}));
    t.subscribe(q=>{this.game=q;});
    
  }

  public playerSelected(player:Player) {

    if (this.svc.GameMode===GameService.STATS_MODE)
      this.currentPlayer=player;
    else if (this.svc.GameMode===GameService.EDIT_STATITEM_MODE) {
      this.currentStatItem.PlayerId=player.PlayerId;
      this.currentStatItem.PlayerName=player.FullName;
      this.svc.GameMode=GameService.STATS_MODE;
    }

  }

  public editStatItem(statItem:StatItem) {
    this.currentStatItem=statItem;
  }

  public actionPerformed(action:GameAction){

    if (this.svc.GameMode===GameService.STATS_MODE) {

    if (action.IsStatAction ) {
      this.statItemPanel.updateItems();
    }
    else if (action.ActionName==="SUB") {
      this.currentPlayer.OnFloor=!this.currentPlayer.OnFloor;
      if (this.currentPlayer.SchoolId===this.game.HomeSchool.SchoolId)
        this.homeList.sortRoster();
      else
        this.visitorList.sortRoster();
    }
  }
  else if (this.svc.GameMode=GameService.EDIT_STATITEM_MODE) {
    this.currentStatItem.StatCode=action.ActionName;
    this.svc.GameMode=GameService.STATS_MODE;
  }

  }
}
