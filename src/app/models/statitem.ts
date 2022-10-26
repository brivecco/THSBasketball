export class StatItem {
    public SchoolId:string;
    public PlayerId:string;
    public PlayerName:string;
    public StatCode:string;
    public Period:string;

    public get Description():string{
        return `${this.PlayerName} ${this.StatEnding()}`
    }

    public StatEnding():string {

        switch (this.StatCode) {
            case "2PM":
                return " made a 2-pointer";
            case "2PF":
                return " missed a 2-pointer";
            case "3PM":
                return " made a 3-pointer";
            case "3PF":
                return " missed a 3-pointer";
            default:
                return "Unknown Action!!";
        }
    }
}