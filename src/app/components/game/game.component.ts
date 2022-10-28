import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameAction } from 'src/app/models/gameAction';
import { Player } from 'src/app/models/player';
import { School } from 'src/app/models/school';
import { StatItem } from 'src/app/models/statitem';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { StatItemListComponent } from '../statitem-list/statitem-list.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public schools : School[] = [
    {SchoolId:"tv1",Name:"Taylorville",Nickname:"Tornadoes"},
    {SchoolId:"mtz1",Name:"Mount Zion",Nickname:"Braves"}
  ]
    
  
  public game$ :Observable<Game>= this.gameService.currentGame$;
  public currentPlayer$:Observable<Player>= this.playerService.currentPlayer$;

  constructor(private gameService: GameService, private playerService: PlayerService) {

  }

  public playerSelected(player:Player) {
    this.playerService.selectCurrentPlayer(player);
  }

  public showStatItem(statItem:StatItem) {
  }


}
