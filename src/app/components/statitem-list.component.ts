import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import {GameService} from '../services/game.service';

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
  displayedColumns: string[] = ['Description',"Edit","Delete"];
  statItems:StatItem[];

  constructor(private svc:GameService) { }

  ngOnInit(): void {
  this.updateItems();
  }

updateItems() {

  switch(this.rosterType) {
    case "home":
      this.statItems=this.game?.StatItems.filter(si=>si.SchoolId===this.game.HomeSchool.SchoolId);
      break;
      case "visitor":
        this.statItems=this.game?.StatItems.filter(si=>si.SchoolId===this.game.VisitorSchool.SchoolId);
        break;
      default:
        this.statItems=this.game?.StatItems ?? [];
        this.statItems=[...this.statItems];
        break;
  }
  
}

    deleteStatItem(statItem:StatItem) {
    this.game.StatItems.splice(this.game.StatItems.indexOf(statItem),1);
    this.updateItems();
    this.currentPlayer?.updateStats(this.game);
  }

  editStatItem(statItem:StatItem) {
    this.svc.GameMode=GameService.EDIT_STATITEM_MODE
    this.selectStatitem.emit(statItem);
  }

  clearAll() {
    this.game.StatItems=[];
    this.statItems=this.game.StatItems;
  }
}
