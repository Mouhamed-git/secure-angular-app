import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc, getDoc } from '@angular/fire/firestore';
import { CollectionReference, getDocs } from 'firebase/firestore';
import { from } from 'rxjs';
import { TransactionModel } from '../shared/models/transaction-model';

@Injectable({
    providedIn: 'root'
})
export class PersonnelService {
    private dbPath: string = 'personnels';
    private personnelRef: CollectionReference;

    constructor(private firestore: Firestore) {
        this.personnelRef = collection(this.firestore, this.dbPath);
    }

    getAll() {
        return from(
            getDocs(this.personnelRef).then((querySnap) =>
                querySnap.docChanges().map((docChanges) => docChanges.doc.data())
            )
        );
    }
}
