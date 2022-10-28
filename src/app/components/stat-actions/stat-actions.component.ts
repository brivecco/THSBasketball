import { Component, Input, Output,EventEmitter } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'src/app/models/game';
import { GameAction } from 'src/app/models/gameAction';
import { Player } from 'src/app/models/player';
import { StatItem } from 'src/app/models/statitem';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.css']
})
export class StatActionsComponent  {
  @Input() game:Game;
  @Input() currentPlayer:Player;

  closeResult:string  = '';

  constructor(private modalService: NgbModal, private gameService: GameService) { }

  public registerStat(statName:string) {
    this.registerAction(new GameAction(statName),true);
  }
  public registerAction(action:GameAction,isStat:boolean) {
    // All actions have to have a current player context
    if (this.currentPlayer){
      if (isStat){
        this.game.StatItems.push(this.createStat(action.ActionName));
      }

      this.gameService.updateGame(this.game);
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

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `yapper`;
			},
		);
	}

}
