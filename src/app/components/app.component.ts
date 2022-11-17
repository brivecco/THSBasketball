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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("statItemPanel") statItemPanel: StatItemListComponent;
  @ViewChild("homeList") homeList: PlayerListComponent;
  @ViewChild("visitorList") visitorList: PlayerListComponent;

  appVersion: string = "1.0.40";
  title: string = 'THS Basketball v' + this.appVersion;

  public schools: School[] = [
    { SchoolId: "tv1", Name: "Taylorville", Nickname: "Tornadoes" },
    { SchoolId: "mtz1", Name: "Mount Zion", Nickname: "Braves" }
  ]

  public game: Game = null;
  public currentPlayer: Player = null;
  public currentStatItem: StatItem = null;
  public gameStarted: boolean = false;

  constructor(private http: HttpClient, private svc: GameService) {

    //this.setGameData(http);

  }

  ngOnInit(): void {

    this.svc.GameMode = GameService.STATS_MODE;
    //this.startGame();
  }

  public startGame(saving: boolean = true) {
  
    let callback = (x: any) => {
      this.game = x;
      this.statItemPanel.updateItems(this.game);
      debugger;
      if (saving)
        this.svc.SyncSaveGame(this.game);
    };

     this.svc.LoadGame(callback);
  }


  
  public gameLoaded(newGame: Game) {
    this.game = newGame;
  }

  private newGame() {

    //let myObj = {id:"43556A",age:366};
    //localStorage.setItem('ravioli', JSON.stringify(myObj));
    //let x = localStorage.getItem("ravioli");
    //let localValues = JSON.parse(x);
    //alert(localValues.age * 2);

    let t: Observable<Game> = this.http.get<Game>("assets/gameData.json")
      .pipe(map(g => {
        g = Object.assign(new Game(), g);
        g.HomeRoster = g.HomeRoster.map(p => Object.assign(new Player(), p));
        g.VisitorRoster = g.VisitorRoster.map(p => Object.assign(new Player(), p));
        g.StatItems = g.StatItems.map(si => Object.assign(new StatItem(), si));
        return g
      }));

    t.subscribe(g => {
      this.svc.SaveGame(g)
      this.startGame();
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
  }

  public commandExecute(cmd: string) {
    switch (cmd) {
      case "startgame":
        this.startGame();
        break;
      case "testgame":
        this.startGame(false);
        break;
      case "newgame":
        this.newGame();
        break;
        case "newgame":
          this.newGame();
          break;
    }
  }

}
