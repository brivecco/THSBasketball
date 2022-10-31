export class Player {
    public SchoolId:string;
    public PlayerId:string;
    public FirstName:string;
    public LastName:string;
    public Jersey:number;
    public OnFloor:boolean;
    
    public get FullName () :string {
        return this.FirstName+" "+this.LastName;
    }

    public get RosterDescription():string {
        return `#${this.Jersey.toString()}-${this.LastName}${this.OnFloor ? ' (F)' : ''}`;
    }
}