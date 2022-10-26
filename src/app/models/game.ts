import { Player } from './player';
import { School } from './school';
import { StatItem } from './statitem';

export class Game {
    public GameId:string;
    public HomeSchool:School | undefined;
    public VisitorSchool:School | undefined;
    public HomeRoster: Player[];
    public VisitorRoster: Player[];
    public StatItems:StatItem[];

}
