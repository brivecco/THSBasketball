import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public currentGame$: Observable<Game> = this.getGameData().pipe(shareReplay(1));
  
  constructor(private h:HttpClient, private db: AngularFireDatabase) { }

  private getGameData() : Observable<Game> {
    return this.db.list('games')
    .snapshotChanges().pipe(
      map(changes => changes.map(c=> { 
        const val: any = c.payload.val();
        const ob = {key: c.payload.key, ...val };
        return ob;
      }
        )),
      map(v=> v[0]),
      map(g=> Object.assign(new Game(), g)),
      map((g: Game)=>
        { 
          return {...g, 
          HomeRoster: g.HomeRoster.map(p=>Object.assign(new Player(),p)),
          VisitorRoster: g.VisitorRoster.map(p=>Object.assign(new Player(),p)),
          StatItems: g.StatItems?.map(si=>Object.assign(new StatItem(),si))
         }
        }
      )
      );

  }

  public insert(game: Game) {
    this.db.list('games').push(game);
  }

  public updateGame(game: Game){
    this.db.list('games').update(game.key, game).then(v=> console.log('test', v));
  }
}
