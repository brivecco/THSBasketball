import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, Observable, shareReplay, Subject } from 'rxjs';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public updateGame$: Subject<Game> = new Subject<Game>();
  public currentGame$: Observable<Game> = merge(this.getGameData(), this.updateGame$).pipe(shareReplay(1));
  
  constructor(private h:HttpClient) { }

  private getGameData() : Observable<Game> {
    return this.h.get<Game>("assets/gameData.json")
    .pipe(map(g=>
      ({...g, 
        HomeRoster: g.HomeRoster.map(p=>Object.assign(new Player(),p)),
        VisitorRoster: g.VisitorRoster.map(p=>Object.assign(new Player(),p)),
        StatItems: g.StatItems.map(si=>Object.assign(new StatItem(),si))
       })
    ));  
  }

  public updateGame(game: Game){
    this.updateGame$.next(game);
  }
}
