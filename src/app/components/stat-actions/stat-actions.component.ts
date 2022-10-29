import { Component, Input, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { filter, first } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameAction } from 'src/app/models/gameAction';
import { Player } from 'src/app/models/player';
import { StatItem } from 'src/app/models/statitem';
import { GameService } from 'src/app/services/game.service';
import { PlayerSubComponent } from '../player-sub/player-sub.component';


@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.css']
})
export class StatActionsComponent  {
  @Input() game:Game;
  @Input() currentPlayer:Player;

  closeResult:string  = '';

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  public registerStat(statName:string) {
    this.registerAction(new GameAction(statName),true);
  }

  public registerAction(action:GameAction,isStat:boolean) {
    // All actions have to have a current player context
    if (this.currentPlayer){
      if (isStat){
        this.game.StatItems = this.game.StatItems ? this.game.StatItems : [];
        this.game.StatItems.push(this.createStat(action.ActionName, action.ActionPlayer));
      }

      this.gameService.updateGame(this.game);
    }
  }

  private createStat(action:string, player: Player = this.currentPlayer):StatItem {
    let item:StatItem=new StatItem();
      item.PlayerId= player.PlayerId;
      item.PlayerName= player.FullName;
      item.StatCode=action;
      item.SchoolId= player.SchoolId;
      item.Period="1";
      return item;
  }

  public subPlayerSelected(player:Player) {
    this.registerAction(new GameAction("playersub",player),false);
  }

  openSubPlayer() {

    const team = this.game.HomeSchool.SchoolId === this.currentPlayer.SchoolId ? 'home' : 'visitor'
		const dialogRef = this.dialog.open(PlayerSubComponent, {
      width: '450px',
      data: {player: this.currentPlayer, team}
    });

    dialogRef.afterClosed().pipe(first(), filter(sub => sub))
    .subscribe(sub => {
      let currentPlayer;
      let subPlayer;
      if(team === 'home'){
        const currentPlayerIndex = this.game.HomeRoster.findIndex(p => p.PlayerId == this.currentPlayer.PlayerId);
        this.game.HomeRoster[currentPlayerIndex].OnFloor = !this.game.HomeRoster[currentPlayerIndex].OnFloor;
        currentPlayer = this.game.HomeRoster[currentPlayerIndex];

        const subPlayerIndex = this.game.HomeRoster.findIndex(p => p.PlayerId == sub.subPlayer.PlayerId);
        this.game.HomeRoster[subPlayerIndex].OnFloor = !this.game.HomeRoster[subPlayerIndex].OnFloor;      
        subPlayer = this.game.HomeRoster[subPlayerIndex];
      }else{
        const currentPlayerIndex = this.game.VisitorRoster.findIndex(p => p.PlayerId == this.currentPlayer.PlayerId);
        this.game.VisitorRoster[currentPlayerIndex].OnFloor = !this.game.VisitorRoster[currentPlayerIndex].OnFloor;
        currentPlayer = this.game.VisitorRoster[currentPlayerIndex];

        const subPlayerIndex = this.game.VisitorRoster.findIndex(p => p.PlayerId == sub.subPlayer.PlayerId);
        this.game.VisitorRoster[subPlayerIndex].OnFloor = !this.game.VisitorRoster[subPlayerIndex].OnFloor;
        subPlayer = this.game.VisitorRoster[subPlayerIndex];
      }
      

      const currentPlayerAction = currentPlayer.OnFloor ? 'subIn' : 'subOut';
      const subPlayerAction = subPlayer.OnFloor ? 'subIn' : 'subOut';

      this.registerAction(new GameAction(currentPlayerAction, currentPlayer),true);
      this.registerAction(new GameAction(subPlayerAction, subPlayer),true);
    } 
      );
	}
}


