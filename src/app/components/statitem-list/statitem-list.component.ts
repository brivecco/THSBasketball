import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { StatItem } from 'src/app/models/statitem';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-statitem-list',
  templateUrl: './statitem-list.component.html',
  styleUrls: ['./statitem-list.component.css']
})
export class StatItemListComponent {
  @Input() currentPlayer: Player;
  @Output() selectStatitem:EventEmitter<StatItem>=new EventEmitter<StatItem>();

  rosterType:string="all";
  displayedColumns: string[] = ['Description'];
  statItems$:Observable<StatItem[]> = this.gameService.currentGame$.pipe(
    map(game => this.filterByType(game))
  );

  constructor(private gameService: GameService) { }


  filterByType(game: Game) : StatItem[] {
  switch(this.rosterType) {
    case "home":
      return game.StatItems.filter(si=>si.SchoolId===game.HomeSchool.SchoolId);
      case "visitor":
        return game.StatItems.filter(si=>si.SchoolId===game.VisitorSchool.SchoolId);
      default:
        return game.StatItems;
  }
  
}

  selectRow(statItem:StatItem) {
    this.selectStatitem.emit(statItem);
  }
}
