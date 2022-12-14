import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { GameAction } from '../models/gameAction';
import { GameService } from '../services/game.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.css']
})
export class StatActionsComponent {
  @Input() game: Game;
  @Input() currentPlayer: Player;
  @Output() action: EventEmitter<GameAction> = new EventEmitter<GameAction>();
  @Output() command: EventEmitter<string> = new EventEmitter<string>();

  closeResult: string = "";

  constructor(private svc: GameService) { }

  public registerStat(statName: string) {

    this.registerAction(new GameAction(statName));
  }
  public registerAction(action: GameAction) {

    // All actions have to have a current player context
    if (this.currentPlayer) {

      if (action.IsStatAction && this.svc.GameMode === GameService.STATS_MODE) {
        this.game.StatItems.unshift(this.createStat(action.ActionName));
      }
      this.action.emit(action);
    }
  }

  private createStat(action: string): StatItem {
    let item: StatItem = new StatItem();
    item.PlayerId = this.currentPlayer.PlayerId;
    item.PlayerName = this.currentPlayer.FullName;
    item.StatCode = action;
    item.SchoolId = this.currentPlayer.SchoolId;
    item.Period = "1";
    return item;
  }

  public get floorFull(): boolean {
    return this.game?.TeamFloorFull(this.currentPlayer) && !this.currentPlayer?.OnFloor;
  }

 

  public selectCommand() {
    let cmd = prompt("command?");
    cmd=cmd.toLowerCase();
    switch (cmd) {
      case "resetstats":
        this.game.StatItems = [];
        this.game.ResetPlayerStats();
        this.action.emit(null);
        break;
      case "run23":
        this.command.emit("startgame");
        break;
      case "test":
        this.command.emit("testgame");
        break;
      case "newgame23":
        this.command.emit("newgame");
        break;
      case "nextgame":
        this.command.emit("nextgame");
        break;
      case "colstats":
        this.command.emit("setcollectedstats");
        break;
      default:
        alert("Not a valid command")
        break;
    }
  }
}
