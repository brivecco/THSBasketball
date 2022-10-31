import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() game: Game;
  @Input() gameMode:string;
  @Input() rosterType:string;
  
  @Output() selectPlayer:EventEmitter<Player>=new EventEmitter<Player>();

  displayedColumns: string[] = ['FullName'];
  roster:Player[];

  constructor() { }

  ngOnInit(): void {
   
   this.setRosterList()
        
  }

  setRosterList() {

    switch(this.rosterType) {
      case "home":
        this.roster=this.game.HomeRoster;
        break;
        case "visitor":
          this.roster=this.game.VisitorRoster;
          break;
        default:
          this.roster=[...this.game.HomeRoster,...this.game.VisitorRoster];
          break;
  }

  this.sortRoster();
}

sortRoster() {
  this.roster.sort((a,b)=>{
    if (a.OnFloor===b.OnFloor)
      return a.Jersey-b.Jersey;
    else
      return a.OnFloor ? -1 : 1;
  }
    );
  this.roster=[...this.roster];
}

  selectRow(player:Player) {
    this.selectPlayer.emit(player);
  }


}
