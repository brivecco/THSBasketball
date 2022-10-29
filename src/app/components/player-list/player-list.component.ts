import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() rosterType:string;
  @Input() showSelected: boolean = false;
  @Output() selectPlayer:EventEmitter<Player>=new EventEmitter<Player>();

  displayedColumns: string[] = ['FullName',"Actions"];

  onTheFloorOnly$: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  playerList$: Observable<Player[]> = this.gameService.currentGame$.pipe(
    map(game => this.filterRosterList(game)),
    map(list => list.sort((a, b) => Number(b.OnFloor) - Number(a.OnFloor)))
  );

  roster$: Observable<Player[]> =  combineLatest([this.playerList$, this.onTheFloorOnly$]).pipe(
    map(([players, onFloor]) => onFloor ? players.filter(p=> p.OnFloor) : players )
  );

  currentPlayer$: Observable<Player> = this.playerService.currentPlayer$;

  selectedRowIndex:number=-1;
  selectedRow: Player = null;

  schoolName$ = this.gameService.currentGame$.pipe(map(game => {
    if(this.rosterType == "home"){
      return game?.HomeSchool?.Name
    } else if(this.rosterType == 'visitor'){
      return game?.VisitorSchool?.Name;
    }else{
      return `${game?.HomeSchool?.Name} x ${game?.VisitorSchool?.Name}`;
    }
  }));


  constructor(private gameService: GameService, private playerService: PlayerService) { }

  
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
    this.selectedRow = player;
    this.selectPlayer.emit(player);
  }

  buttonClick(e:any) {
    e.stopPropagation();
  }

  setFloorList(onFloor: any){
    this.onTheFloorOnly$.next(onFloor.checked);
  }

}
