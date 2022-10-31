export class StatItem {
    public SchoolId: string;
    public PlayerId: string;
    public PlayerName: string;
    public StatCode: string;
    public Period: string;

    public get Description(): string {
        return `${this.PlayerName} ${this.StatEnding()}`
    }

    public StatEnding(): string {

        switch (this.StatCode) {
            case "2P":
                return " made a 2-pointer";
            case "2PM":
                return " missed a 2-pointer";
            case "3P":
                return " made a 3-pointer";
            case "3PM":
                return " missed a 3-pointer";
            case "FT":
                return " made a free throw";
            case "FTM":
                return " missed a freethrow";
            case "DREB":
                return " got a defensive rebound";
            case "OREB":
                return " got an offensive rebound";
            case "ASS":
                return " got an assist";
            default:
                return "Unknown Action!!";
        }
    }

    public Score(): number {
        switch (this.StatCode) {
            case "2P":
                return 2;
            case "3P":
                return 3;
            case "FT":
                return 1;
            default:
                return 0;
        }
    }
}