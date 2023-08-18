import { Timestamp } from 'firebase/firestore';
import { DecaissementType } from '../enums/decaissement-type';
import { TransactionType } from '../enums/transaction-type';

export class TransactionModel {
    type?: TransactionType;
    personnel?: string;
    cin?: string;
    mounth?: string;
    amount?: number;
    status?: number;
    paymentDate?: Timestamp;
    decaissementType?: DecaissementType;
    location?: string;
    duration?: number;
    description?: string;
    decaissementDate?: Timestamp;
}
