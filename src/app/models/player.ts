import { Game } from "./game";
import { StatItem } from "./statitem";

export class Player {
    public SchoolId: string;
    public PlayerId: string;
    public FirstName: string;
    public LastName: string;
    public Jersey: number;
    public Height: string;
    public OnFloor: boolean = false;

    public Points: number = 0;
    public Fouls: number = 0;
    public Assists: number = 0;
    public OffRebounds: number = 0;
    public DefRebounds: number = 0;
    public Rebounds: number = 0;
    public ThreePointsMade: number = 0;
    public ThreePointsMissed: number = 0;
    public TwoPointsMade: number = 0;
    public TwoPointsMissed: number = 0;
    public FreeThrowsMade: number = 0;
    public FreeThrowsMissed: number = 0;

    public get FullName(): string {
        return this.FirstName + " " + this.LastName;
    }

    public RosterDescription(isVisitor: boolean): string {
        //return `#${this.Jersey.toString()}-${this.LastName}`;
        if (!isVisitor)
            return `(${this.Jersey.toString()}) - ${this.LastName}`;
        else
            return `${this.LastName} - (${this.Jersey.toString()})`;
    }

    public get StatLineDescription(): string {
        return `${this.FullName} (${this.Points} Points, ${this.Fouls} Fouls)`
    }

    public updateStats(game: Game): void {
        if (game && game.StatItems) {
            const items = game.StatItems.filter(si => si.PlayerId === this.PlayerId);
            this.ThreePointsMade = items.filter(si => si.StatCode === "3P")?.length;
            this.ThreePointsMissed = items.filter(si => si.StatCode === "3PM")?.length;
            this.TwoPointsMade = items.filter(si => si.StatCode === "2P")?.length;
            this.TwoPointsMissed = items.filter(si => si.StatCode === "2PM")?.length;
            this.FreeThrowsMade = items.filter(si => si.StatCode === "FT")?.length;
            this.FreeThrowsMissed = items.filter(si => si.StatCode === "FTM")?.length;
            this.Points = this.ThreePointsMade * 3 + this.TwoPointsMade * 2 + this.FreeThrowsMade;
            this.Fouls = items.filter(si => si.StatCode === "FOUL")?.length;
            this.OffRebounds = items.filter(si => si.StatCode === "OREB")?.length;
            this.DefRebounds = items.filter(si => si.StatCode === "DREB")?.length;
            this.Rebounds = this.OffRebounds + this.DefRebounds;
            this.Assists = items.filter(si => si.StatCode === "AST")?.length;
        }
    }
    public resetStats() {
        this.Points = 0
        this.Fouls = 0;
    }

}