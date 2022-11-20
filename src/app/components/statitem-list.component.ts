import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { School } from '../models/school';
import { Player } from '../models/player';
import { StatItem } from '../models/statitem';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-statitem-list',
  templateUrl: './statitem-list.component.html',
  styleUrls: ['./statitem-list.component.css']
})
export class StatItemListComponent implements OnInit {
  //@Input() game: Game;
  @Input() currentPlayer: Player;

  @Output() selectStatitem: EventEmitter<StatItem> = new EventEmitter<StatItem>();

  game:Game;
  rosterType: string = "all";
  displayedColumns: string[] = ['Description', "Edit", "Delete"];
  statItems: StatItem[];
  selectedStatItem:StatItem;
isDeleting:boolean=false;

  constructor(private svc: GameService) { }

  ngOnInit(): void {
    //this.updateItems();
  }

  updateItems(game:Game) {

    this.game=game;

    switch (this.rosterType) {
      case "home":
        this.statItems = this.game?.StatItems.filter(si => si.SchoolId === this.game.HomeSchool.SchoolId);
        break;
      case "visitor":
        this.statItems = this.game?.StatItems.filter(si => si.SchoolId === this.game.VisitorSchool.SchoolId);
        break;
      default:
        this.statItems = this.game?.StatItems ?? [];
        this.statItems = [...this.statItems];
        break;
    }

  }

  setDeleteMode(statItem: StatItem) {
    this.isDeleting=true;
    this.selectedStatItem=statItem;
  }

  deleteStatItem() {
    this.currentPlayer=this.game?.GetPlayer(this.selectedStatItem.PlayerId);
    this.game.StatItems.splice(this.game.StatItems.indexOf(this.selectedStatItem), 1);
    this.updateItems(this.game);
    this.currentPlayer?.updateStats(this.game);
    this.svc.Save(this.game);
    this.selectedStatItem=null;
    this.svc.GameMode=GameService.STATS_MODE;
    this.isDeleting=false;
  }

  editStatItem(statItem: StatItem) {
    this.svc.GameMode = GameService.EDIT_STATITEM_MODE
    this.selectStatitem.emit(statItem);
    this.selectedStatItem=statItem;
  }

  clearAll() {
    this.game.StatItems = [];
    this.statItems = this.game.StatItems;
  }

  public cancelEdit() {
    this.svc.GameMode = GameService.STATS_MODE;
    this.isDeleting=false;
    this.selectStatitem=null;
  }

  public get isEditing(): boolean {
    return this.svc.GameMode === GameService.EDIT_STATITEM_MODE;
  }

}
