import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { GameAction } from '../models/gameAction';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.css']
})
export class StatActionsComponent  {
  @Input() game:Game;
  @Input() currentPlayer:Player;
  @Output() action:EventEmitter<GameAction>=new EventEmitter<GameAction>();

  closeResult:string  = '';

  constructor() { }

  public registerStat(statName:string) {
    this.registerAction(new GameAction(statName),true);
  }
  public registerAction(action:GameAction,isStat:boolean) {

    // All actions have to have a current player context
    if (this.currentPlayer){
      if (isStat){}
        this.game.StatItems.push(this.createStat(action.ActionName));
      this.action.emit(action);
    }
  }

  private createStat(action:string):StatItem {
    let item:StatItem=new StatItem();
      item.PlayerId=this.currentPlayer.PlayerId;
      item.PlayerName=this.currentPlayer.FullName;
      item.StatCode=action;
      item.SchoolId=this.currentPlayer.SchoolId;
      item.Period="1";
      return item;
  }

  public subPlayerSelected(player:Player) {

    this.registerAction(new GameAction("playersub",player),false);
  }

  
}
