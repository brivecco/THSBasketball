import { Player } from './player';
import { School } from './school';
import { StatItem } from './statitem';

export class Game {
    public GameId: string;
    public HomeSchool: School | undefined;
    public VisitorSchool: School | undefined;
    public HomeRoster: Player[];
    public VisitorRoster: Player[];
    public HomeRosterOnFloor: Player[];
    public VisitorRosterOnFloor: Player[];
    public StatItems: StatItem[];

    public get HomeScore(): number {
        return this.StatItems?.filter(si => si.SchoolId === this.HomeSchool.SchoolId).reduce((a, b) => a + b.Score(), 0);
    }

    public get VisitorScore(): number {
        return this.StatItems?.filter(si => si.SchoolId === this.VisitorSchool.SchoolId).reduce((a, b) => a + b.Score(), 0);
    }

    public TeamFloorFull(player:Player) : boolean {
        let roster:Player[]= player?.SchoolId==this.HomeSchool?.SchoolId ? this.HomeRoster :this.VisitorRoster ;
        roster=roster?.filter(p=>p.OnFloor);
        return roster?.length>=5;
       }
    
    public get CombinedRoster():Player[] {
        if (this.HomeRoster && this.VisitorRoster)
            return [...this.HomeRoster,...this.VisitorRoster];
        else
            return null;
    }
    public GetPlayer(playerId:string):Player {
        const roster:Player[]=this.CombinedRoster;
        if (roster)
            return roster.find(p=>p.PlayerId===playerId);
        else
            return null;
    }
}
