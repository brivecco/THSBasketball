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
    public PointStatItems: StatItem[];
    public ReboundStatItems: StatItem[];

    public get HomeScore(): number {
        return this.StatItems?.filter(si => si.SchoolId === this.HomeSchool.SchoolId).reduce((a, b) => a + b.Score(), 0);
    }

    public get VisitorScore(): number {
        return this.StatItems?.filter(si => si.SchoolId === this.VisitorSchool.SchoolId).reduce((a, b) => a + b.Score(), 0);
    }

    public TeamFloorFull(player: Player): boolean {
        let roster: Player[] = player?.SchoolId == this.HomeSchool?.SchoolId ? this.HomeRoster : this.VisitorRoster;
        roster = roster?.filter(p => p.OnFloor);
        return roster?.length >= 5;
    }

    public get CombinedRoster(): Player[] {
        if (this.HomeRoster && this.VisitorRoster)
            return [...this.HomeRoster, ...this.VisitorRoster];
        else
            return null;
    }
    public GetPlayer(playerId: string): Player {
        const roster: Player[] = this.CombinedRoster;
        if (roster)
            return roster.find(p => p.PlayerId === playerId);
        else
            return null;
    }
    public ResetPlayerStats() {
        this.CombinedRoster.forEach(p => p.resetStats());
    }

    public UpdateSeparatedStats(colStats: string[]) {
        const pointStatCodes: string[] = ["FT", "FTM", "2P", "2PM", "3P", "3PM", "FOUL"];
        const reboundStatCodes: string[] = ["DREB", "OREB"];

        if (colStats.includes("p"))
            this.PointStatItems = this.StatItems.filter(si => pointStatCodes.includes(si.StatCode));
        else
            this.PointStatItems = null;

        if (colStats.includes("r"))
            this.ReboundStatItems = this.StatItems.filter(si => reboundStatCodes.includes(si.StatCode));
        else
            this.ReboundStatItems = null;

    }

    public updateRoster(newGame: Game) {

        // Add or update players
        newGame.CombinedRoster.forEach(p => {
            let player: Player = this.CombinedRoster.find(fp => fp.PlayerId == p.PlayerId);
            if (player) {
                player.FirstName = p.FirstName;
                player.LastName = p.LastName;
                player.Jersey = p.Jersey;
                player.Height = p.Height;
                player.Position = p.Position;
            }
            else {
                if (p.SchoolId = this.HomeSchool.SchoolId)
                    this.HomeRoster.push(p)
                else
                    this.VisitorRoster.push(p);
            }
        });

        // Delete players
        for (let i = 0; i < this.HomeRoster.length; i++) {
            let player: Player = newGame.HomeRoster.find(fp => fp.PlayerId == this.HomeRoster[i].PlayerId);
            if (!player) {
                let playerId=this.HomeRoster[i].PlayerId;
                this.HomeRoster.splice(i, 1);
                this.StatItems=this.StatItems.filter(si=>si.PlayerId!== playerId);
            }
        }
        for (let i = 0; i < this.VisitorRoster.length; i++) {
            let player: Player = newGame.VisitorRoster.find(fp => fp.PlayerId == this.VisitorRoster[i].PlayerId);
            if (!player) {
                let playerId=this.HomeRoster[i].PlayerId;
                this.VisitorRoster.splice(i, 1);
                this.StatItems=this.StatItems.filter(si=>si.PlayerId!==playerId);
            }
        }

        //  Update statitem names
        for (let i = 0; i < this.StatItems.length; i++) {
            let item=this.StatItems[i];
            let player: Player = this.CombinedRoster.find(p=>p.PlayerId===item.PlayerId);
            if (player) {
                item.PlayerName=player.FullName;
            }
        }
        
    }
}
