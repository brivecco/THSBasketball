import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';



@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.css']
})
export class StatActionsComponent  {
  @Input() game:Game;
  @Input() currentPlayer:Player;
  @Output() action:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  public registerAction(action:string) {

    if (this.currentPlayer){
      let item:StatItem=new StatItem();
      item.PlayerId=this.currentPlayer.PlayerId;
      item.PlayerName=this.currentPlayer.FullName;
      item.StatCode=action;
      item.SchoolId=this.currentPlayer.SchoolId;
      item.Period="1";
      this.game.StatItems.push(item);
      this.action.emit();
    }
  }

}
