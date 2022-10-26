import { Component, ViewChild } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';

import {map} from 'rxjs/operators';  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimationPlayer } from '@angular/animations';
import { StatItemListComponent } from './statitem-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("statItemPanel") statItemPanel:StatItemListComponent;

  title = 'THSBasketball';

  public schools : School[] = [
    {SchoolId:"tv1",Name:"Taylorville",Nickname:"Tornadoes"},
    {SchoolId:"mtz1",Name:"Mount Zion",Nickname:"Braves"}
  ]
    
  
  public game:Game=null;
  public currentPlayer:Player=null;

  constructor(http:HttpClient) {
   
    //this.game=new Game();
    //this.game.HomeSchool= this.schools.find(s=>s.SchoolId==="tv1");
    //this.game.VisitorSchool= this.schools.find(s=>s.SchoolId==="mtz1");
    this.setGameData(http);
  }

  private setGameData(h:HttpClient) {
    let t:Observable<Game>=h.get<Game>("assets/gameData.json")
    .pipe(map(g=>{
      g.HomeRoster=g.HomeRoster.map(p=>Object.assign(new Player(),p));
      g.VisitorRoster=g.VisitorRoster.map(p=>Object.assign(new Player(),p));
      g.StatItems=g.StatItems.map(si=>Object.assign(new StatItem(),si));
      return g}));
    t.subscribe(q=>{this.game=q;});
    
  }

  public playerSelected(player:Player) {
    this.currentPlayer=player;
  }

  public showStatItem(statItem:StatItem) {
  }

  public actionAdded(){
    this.statItemPanel.updateItems();
  }
}
