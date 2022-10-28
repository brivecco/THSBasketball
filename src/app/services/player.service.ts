import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _currentPlayer$: ReplaySubject<Player> = new ReplaySubject<Player>(1);
  public get currentPlayer$() : Observable<Player>{
    return this._currentPlayer$.asObservable();
  }

  constructor() { }

  public selectCurrentPlayer(player: Player) {
    this._currentPlayer$.next(player);
  }


}
