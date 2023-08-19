import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { TransactionService } from '../../services/transaction.service';
import {MONTHS} from '../../shared/enums/mounth.enums';
import {  TRANSACTION_TYPE } from '../../shared/enums/transaction-type.enums';
import {DateUtils} from "../../utils/date.utils";
import {Transaction} from "../../shared/models/transaction-model";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    transactions: Transaction[] = [];
    months = MONTHS;
    transactionTypes = TRANSACTION_TYPE;

    constructor(private transactionService: TransactionService) {}

    ngOnInit(): void {
        // this.getTransactions();
    }

    getTransactions() {
        this.transactionService.getAll().subscribe({
          next:  (data) => {
            this.transactions = data;
          },
          error: (error) => {
            console.log(error);
          }
        }
        );
    }

    ngAfterViewInit() {
        this.getTransactions();
    }


    getStatus(status?: number) {
        switch (status) {
            case 0:
                return 'Non Payé';
            case 1:
                return 'Payé';
        }
        return;
    }

    filter(event: any) {
    }

    getDate(dateTime: Timestamp) {
        return DateUtils.convertToDate(dateTime!);
    }
}
