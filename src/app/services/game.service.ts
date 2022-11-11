import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
static readonly STATS_MODE:string="STATMODE";
static readonly EDIT_STATITEM_MODE:string="EDITSIMODE";

static firebaseConfig : any = {
  apiKey: "AIzaSyBtPMWBnl2Aj6z-jN_7gqNopJfay3Zb9wI",
  authDomain: "thshooptest.firebaseapp.com",
  databaseURL: "https://thshooptest-default-rtdb.firebaseio.com",
  projectId: "thshooptest",
  storageBucket: "thshooptest.appspot.com",
  messagingSenderId: "767237819710",
  appId: "1:767237819710:web:5baaac7425f83a0160306f"
};

public GameMode:String;
  constructor() { 
    this.GameMode=GameService.STATS_MODE;
  }

  public SaveGame(game:Game) {
   
    const app = initializeApp(GameService.firebaseConfig);
    const db = getDatabase(app);

    //const ref1 = ref(db,"/players");
    const ref1 = ref(db);

    let data: any;
    set(ref1,game)

    /*
    onValue(ref1, (snapshot) => {
      data = snapshot.val();
      set(ref1,this.game);
      alert("it was set3");
    });
    */

  }
}
