import { Game } from "./game";
import { StatItem} from "./statitem";

export class Player {
    public SchoolId:string;
    public PlayerId:string;
    public FirstName:string;
    public LastName:string;
    public Jersey:number;
    public OnFloor:boolean;
    
    public Points:number=0;
    
    public get FullName () :string {
        return this.FirstName+" "+this.LastName;
    }

    public get RosterDescription():string {
        return `#${this.Jersey.toString()}-${this.LastName}${this.OnFloor ? ' (F)' : ''}`;
    }

    public get StatLineDescription():string {
        return `${this.FullName} (${this.Points} Points)`
    }

    public updateStats(game:Game):void {
        if (game && game.StatItems) {
            const items=game.StatItems.filter(si=>si.PlayerId===this.PlayerId);
            this.Points=items.reduce((a,b)=>a+b.Score(),0);
        }
    }

}