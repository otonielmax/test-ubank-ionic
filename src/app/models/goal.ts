import { Rules } from './rules';
import { GoalType } from './../enums/goal-type.enum';

export class Goal {

    id: number;
    goalType: GoalType;
    goalDate: Date;
    amount: number;
    rules: Rules[];

    constructor(id: number, goalType: GoalType, goalDate: Date, amount: number) {
        this.id = id;
        this.goalType = goalType;
        this.goalDate = goalDate;
        this.amount = amount;
        this.rules = [];
    }
}
