import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';

@Component({
  selector: 'app-statitem-list',
  templateUrl: './statitem-list.component.html',
  styleUrls: ['./statitem-list.component.css']
})
export class StatItemListComponent implements OnInit {
  @Input() game: Game;
  @Input() currentPlayer: Player;
  @Output() selectStatitem:EventEmitter<StatItem>=new EventEmitter<StatItem>();

  rosterType:string="all";
  displayedColumns: string[] = ['Description'];
  statItems:StatItem[];

  constructor() { }

  ngOnInit(): void {
  this.updateItems();
  }

updateItems() {

  switch(this.rosterType) {
    case "home":
      this.statItems=this.game.StatItems.filter(si=>si.SchoolId===this.game.HomeSchool.SchoolId);
      break;
      case "visitor":
        this.statItems=this.game.StatItems.filter(si=>si.SchoolId===this.game.VisitorSchool.SchoolId);
        break;
      default:
        this.statItems=[...this.game.StatItems];
        break;
  }
  
}

  selectRow(statItem:StatItem) {
    this.selectStatitem.emit(statItem);
  }
}
