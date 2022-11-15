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


  public async SyncSaveGame(game: Game) {

    this.runGameId = setInterval(() => {
      if (this.db && game) {
        const ref1 = ref(this.db);
        set(ref1, game)
      }
    }, 5000);
  }

  public LoadGame(callback: any) {

    const ref1 = ref(this.db);

    get(ref1).then((snapshot) => {
      let g: Game = snapshot.val();
      g = Object.assign(new Game(), g);
      g.HomeRoster = g.HomeRoster.map(p => Object.assign(new Player(), p));
      g.VisitorRoster = g.VisitorRoster.map(p => Object.assign(new Player(), p));
      if (g.StatItems)
        g.StatItems = g.StatItems.map(si => Object.assign(new StatItem(), si));
      else
        g.StatItems = [];

      if (callback)
        callback(g);
    })
  }

  public SaveGame(game: Game) {
    if (this.db && game) {
      const ref1 = ref(this.db);
      set(ref1, game)
    }
  }

  public pullNewGame() {
    console.log("pull new game");
    let t: Observable<Game> = this.http.get<Game>("https://us-central1-thshooptest.cloudfunctions.net/newGameData?text=yowsa")
      .pipe(map(g => {
        return g
      }));

    t.subscribe(g => {
      console.log(g);
    });
  }
}
