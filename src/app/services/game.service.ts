import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get, Database } from 'firebase/database';
import { __asyncDelegator } from 'tslib';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  static readonly STATS_MODE: string = "STATMODE";
  static readonly EDIT_STATITEM_MODE: string = "EDITSIMODE";

  @Output() gameLoaded: EventEmitter<Game> = new EventEmitter<Game>();

  static firebaseConfig: any = {
    apiKey: "AIzaSyBtPMWBnl2Aj6z-jN_7gqNopJfay3Zb9wI",
    authDomain: "thshooptest.firebaseapp.com",
    databaseURL: "https://thshooptest-default-rtdb.firebaseio.com",
    projectId: "thshooptest",
    storageBucket: "thshooptest.appspot.com",
    messagingSenderId: "767237819710",
    appId: "1:767237819710:web:5baaac7425f83a0160306f"
  };


  public GameMode: String;
  public app: FirebaseApp;
  public db: Database;
  public runGameId: any;

  constructor(private http: HttpClient) {
    this.GameMode = GameService.STATS_MODE;
    this.app = initializeApp(GameService.firebaseConfig);
    this.db = getDatabase(this.app);
  }


  public LoadRemoteGame() {

    const ref1 = ref(this.db);

    get(ref1).then((snapshot) => {
      let snapGame: Game = snapshot.val();
      let savedGame: Game = Object.assign(new Game(), snapGame);

      if (!savedGame)
        return null;
      else
        return this.mapLoadedGame(savedGame);
    })
  }

  public LoadLocalGame(): Game {
    let savedGame: Game = JSON.parse(localStorage.getItem("currentGame"));
    if (!savedGame)
      return null;
    else
      return this.mapLoadedGame(savedGame);

  }

  private mapLoadedGame(savedGame: Game) {
    let newGame: Game = Object.assign(new Game(), savedGame);
    newGame.HomeRoster = newGame.HomeRoster.map(p => Object.assign(new Player(), p));
    newGame.VisitorRoster = newGame.VisitorRoster.map(p => Object.assign(new Player(), p));
    if (newGame.StatItems)
      newGame.StatItems = newGame.StatItems.map(si => Object.assign(new StatItem(), si));
    else
      newGame.StatItems = [];

    return newGame;
  }

  public Save(game: Game) {
    setTimeout(() => {
      this.SaveLocalGame(game);
      this.SaveRemoteGame(game);
    }, 0);
  }

  public SaveStatItems(game: Game,statGroups:string[]) {
    setTimeout(() => {
      this.SaveLocalGame(game);
      this.SaveRemoteGameStatItems(game,statGroups);
    }, 2000);
  }


  public SaveLocalGame(game: Game) {
    localStorage.setItem('currentGame', JSON.stringify(game));
  }

  public SaveRemoteGame(game: Game) {
    if (this.db && game) {
      const ref1 = ref(this.db);
      set(ref1, game);
    }
  }

  public SaveRemoteGameStatItems(game: Game, statGroups: string[]) {
    if (this.db && game) {

      let nodeName: string = "";
      let node:any=null;

      for (const statGroup of statGroups) {
        switch (statGroup) {
          case "p":
            nodeName = "PointStatItems";
            node=game.PointStatItems;
            break;
          case "r":
            nodeName = "ReboundStatItems";
            node=game.ReboundStatItems;
            break;
        }
        const ref1 = ref(this.db, nodeName);
        set(ref1, node);
      }
     
    }
  }

  public pullNextGame(): Observable<Game> {
    return this.http.get<Game>("https://us-central1-thshooptest.cloudfunctions.net/newGameData")
      .pipe(map(nextGame => {
        if (!nextGame)
          return null;
        else
          return this.mapLoadedGame(nextGame);
      }));

  }
}
