import { Player } from './player';

export class GameAction {
    public ActionName:string;
    public ActionPlayer:Player;

    private statActionNames:string[]=["2PM","2PF","3PM","3PF","FTM","FTF","subIn", "subOut"];

    constructor(actionName:string,actionPlayer?:Player) {
        this.ActionName=actionName;
        this.ActionPlayer=actionPlayer;
    }

    public get IsStatAction():boolean {
        return this.statActionNames.includes(this.ActionName);
   }

}