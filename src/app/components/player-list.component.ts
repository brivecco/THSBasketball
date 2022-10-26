import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() game: Game;
  @Input() rosterType:string;
  @Output() selectPlayer:EventEmitter<Player>=new EventEmitter<Player>();

  displayedColumns: string[] = ['FullName'];
  roster:Player[];

  constructor() { }

  ngOnInit(): void {
   
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
    
  }

  selectRow(player:Player) {
    this.selectPlayer.emit(player);
  }
}
