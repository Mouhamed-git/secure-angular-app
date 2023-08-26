import { Timestamp } from 'firebase/firestore';
import { OutflowType } from '../enums/decaissement-type.enums';
import { TransactionType } from '../enums/transaction-type.enums';

export class Transaction {
    type?: TransactionType;
    personnel?: string;
    cin?: string;
    mouth?: string;
    amount?: number;
    status?: number;
    paymentDate?: Timestamp;
    outflowType?: OutflowType;
    location?: string;
    duration?: number;
    description?: string;
    outflowDate?: Timestamp;
}
