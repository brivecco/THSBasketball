import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Player } from './player';
import { StatItem } from './statitem';

export class GameAction {
    public ActionName:string;
    public ActionPlayer:Player;
    public ActionStatItem:StatItem;

    private statActionNames:string[]=["FT","FTM","2P","2PM","3P","3PM","DREB","OREB","ASS"];

    constructor(actionName:string,actionPlayer?:Player) {
        this.ActionName=actionName;
        this.ActionPlayer=actionPlayer;
    }

    public get IsStatAction():boolean {
        return this.statActionNames.includes(this.ActionName);
   }

}