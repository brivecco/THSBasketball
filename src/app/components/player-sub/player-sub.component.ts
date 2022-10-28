import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-sub',
  templateUrl: './player-sub.component.html',
  styleUrls: ['./player-sub.component.css']
})
export class PlayerSubComponent {

  currentPlayer = this.data.player;
  subPlayer: Player;
  team: string = this.data.team;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {player: Player, team: string}, public gameService: GameService) { }


  selectPlayer(subPlayer: Player){
    debugger;
    this.subPlayer = subPlayer;
  }


}
