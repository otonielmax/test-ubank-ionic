import { EventType } from './../enums/event-type.enum';

export class Rules {

    id: number;
    idGoal: number;
    idFootballTeam: number;
    eventType: EventType;
    amount: number;
    nameTeam: string;
    imgTeam: string;
    
    constructor(id: number, idGoal: number, idFootballTeam: number, eventType: EventType, amount: number, nameTeam: string, imgTeam:string) {
        this.id = id;
        this.idGoal = idGoal;
        this.idFootballTeam = idFootballTeam;
        this.eventType = eventType;
        this.amount = amount;
        this.nameTeam = nameTeam;
        this.imgTeam = imgTeam;
    }
}
