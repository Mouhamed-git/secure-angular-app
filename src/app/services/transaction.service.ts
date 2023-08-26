import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc, getDoc } from '@angular/fire/firestore';
import { CollectionReference, getDocs } from 'firebase/firestore';
import { from } from 'rxjs';
import { TransactionType } from '../shared/enums/transaction-type.enums';
import { Transaction } from '../shared/models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private dbPath: string = 'transactions';
    private readonly transactionRef: CollectionReference;

    constructor(private firestore: Firestore) {
        this.transactionRef = collection(this.firestore, this.dbPath);
    }

    save(transaction: Transaction) {
        return from(
            addDoc(this.transactionRef, {
                ...transaction
            })
        );
    }

    getAll() {
        return from(
            getDocs(this.transactionRef).then((querySnap) =>
                querySnap.docChanges().map((docChanges) => docChanges.doc.data())
            )
        );
    }
}
