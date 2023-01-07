import { Component, ViewChild, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { GameAction } from '../models/gameAction';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimationPlayer } from '@angular/animations';
import { StatItemListComponent } from './statitem-list.component';
import { PlayerListComponent } from './player-list.component';
import { GameService } from '../services/game.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("statItemPanel") statItemPanel: StatItemListComponent;
  @ViewChild("homeList") homeList: PlayerListComponent;
  @ViewChild("visitorList") visitorList: PlayerListComponent;

  appVersion: string = "1.3.14";
  title: string = 'THS Basketball v' + this.appVersion;

  public schools: School[];

  public game: Game = null;
  public collectedStats:string[];
  public currentPlayer: Player = null;
  public currentStatItem: StatItem = null;
  public gameStarted: boolean = false;

  constructor(private http: HttpClient, private svc: GameService) {
  }

  ngOnInit(): void {
    this.svc.GameMode = GameService.STATS_MODE;
    //localStorage.removeItem("collectedStats");
    //localStorage.setItem("collectedStats",["a","b","d"].join(","));
    let localStatSetting:string=localStorage.getItem("collectedStats");
    if (localStatSetting ){
      localStatSetting=localStatSetting.trim();
      this.collectedStats=localStatSetting.split(",");
      this.startGame();
    }
    else {
      alert("No Stat Collection Selected!!");
    }


  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.statItemPanel.updateItems(this.game),0);
  }

  public startGame(game:Game=null) {
    this.game=game? game : this.svc.LoadLocalGame();

    if (this.statItemPanel)
    this.statItemPanel.updateItems(this.game);
  }

  public startNextGame() {
    this.svc.pullNextGame().subscribe(g => {
      debugger;
      this.svc.Save(g);
      this.game=g;
      this.statItemPanel.updateItems(this.game);
    });
  }

  public updateRosters() {
    this.svc.pullNextGame().subscribe(g => {
      this.game.updateRoster(g);
      this.currentPlayer=null;
      this.game.UpdateSeparatedStats(this.collectedStats);
      this.svc.SaveStatItems(this.game,this.collectedStats);
      this.statItemPanel.updateItems(this.game);
    });
  }

  public playerSelected(player: Player) {

    if (this.svc.GameMode === GameService.STATS_MODE) {
      this.currentPlayer = player;
      this.currentPlayer.updateStats(this.game);
    }
    else if (this.svc.GameMode === GameService.EDIT_STATITEM_MODE) {
      // Change the statitem info
      const origPlayer: Player = this.game.GetPlayer(this.currentStatItem.PlayerId);
      this.currentStatItem.PlayerId = player.PlayerId;
      this.currentStatItem.PlayerName = player.FullName;
      origPlayer.updateStats(this.game);
      player.updateStats(this.game);
      this.game.UpdateSeparatedStats(this.collectedStats);
      this.svc.SaveStatItems(this.game,this.collectedStats);
      this.svc.GameMode = GameService.STATS_MODE;
    }
  }

  public editStatItem(statItem: StatItem) {
    this.currentStatItem = statItem;
  }

  public actionPerformed(action: GameAction) {

    if (!action) {
      this.statItemPanel.updateItems(this.game);
      return;
    }

    if (this.svc.GameMode === GameService.STATS_MODE) {

      if (action.IsStatAction) {
        this.statItemPanel.updateItems(this.game);
      }
      else if (action.ActionName === "SUB") {
        this.currentPlayer.OnFloor = !this.currentPlayer.OnFloor;
        if (this.currentPlayer.SchoolId === this.game.HomeSchool.SchoolId)
          this.homeList.sortRoster();
        else
          this.visitorList.sortRoster();
      }
    }
    else if (this.svc.GameMode = GameService.EDIT_STATITEM_MODE) {
      this.currentStatItem.StatCode = action.ActionName;
      this.svc.GameMode = GameService.STATS_MODE;
    }
    this.currentPlayer?.updateStats(this.game);
    this.game.UpdateSeparatedStats(this.collectedStats);
    this.svc.SaveStatItems(this.game,this.collectedStats);
  }

  public commandExecute(cmd: string) {
    
    switch (cmd) {
      case "nextgame":
        this.startNextGame();
        break;
      case "setcollectedstats":
        let newCollectedStats:string=prompt("Stat Codes to Collect?");
        localStorage.setItem("collectedStats",newCollectedStats);
        break;
      case "updaterosters":
        this.updateRosters();
        break;
    }
  }

}
