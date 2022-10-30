export class Player {
    public SchoolId:string;
    public PlayerId:string;
    public FirstName:string;
    public LastName:string;
    public OnFloor:boolean;
    
    public get FullName () :string {
        return this.FirstName+" "+this.LastName;
    }
}