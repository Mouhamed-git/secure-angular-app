import { DecaissementType } from '../enums/decaissement-type';

export class DecaissementModel {
    decaissementType?: DecaissementType;
    personnel?: string;
    location?: string;
    duration?: string;
    amountMission?: string;
    amount?: string;
    description?: string;
    decaissementDate?: string;
}
