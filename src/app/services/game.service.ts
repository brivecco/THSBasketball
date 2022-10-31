import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
public GameModeBob:String;
  constructor() { 
    this.GameModeBob="yella";
  }
}
