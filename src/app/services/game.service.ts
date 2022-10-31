import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
static readonly STATS_MODE:string="STATMODE";
static readonly EDIT_STATITEM_MODE:string="EDITSIMODE";
public GameMode:String;
  constructor() { 
    this.GameMode=GameService.STATS_MODE;
  }
}
