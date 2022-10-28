import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() game: Game;
  @Input() rosterType:string;
  @Output() selectPlayer:EventEmitter<Player>=new EventEmitter<Player>();

  displayedColumns: string[] = ['FullName',"Actions"];
  roster$: Observable<Player[]> = this.gameService.currentGame$.pipe(
    map(game => this.filterRosterList(game))
  );
  selectedRowIndex:number=-1;
  onTheFloorOnly:boolean=true;

  constructor(private gameService: GameService) { }


  filterRosterList(game: Game) : Player[] {

    switch(this.rosterType) {
      case "home":
        return game.HomeRoster;
        case "visitor":
          return game.VisitorRoster;
        default:
          return [...game.HomeRoster, ...game.VisitorRoster];
  }
}
  selectRow(player:Player,rowIndex:number) {
    this.selectedRowIndex=rowIndex;
    this.selectPlayer.emit(player);
  }

  buttonClick(e:any) {
    e.stopPropagation();
  }

  setFloorList(){
    
  }

}
