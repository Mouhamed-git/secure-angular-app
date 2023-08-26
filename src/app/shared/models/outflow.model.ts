import { OutflowType } from '../enums/decaissement-type.enums';

export class Outflow {
    outflowType?: OutflowType;
    personnel?: string;
    location?: string;
    duration?: string;
    amountMission?: string;
    amount?: string;
    description?: string;
    outflowDate?: string;
}
