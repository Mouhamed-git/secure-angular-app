import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../../services/personnel.service';
import { TransactionService } from '../../../services/transaction.service';
import {  MONTHS } from '../../enums/mounth';
import { TransactionType } from '../../enums/transaction-type';
import { PaymentModel } from '../../models/payment-model';
import { PersonnelModel } from '../../models/personnel-model';
import { TransactionModel } from '../../models/transaction-model';
import { FormValidator } from '../../../utils/form-validator-utils';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    payment: PaymentModel = new PaymentModel();
    submitted: boolean = false;
    mouths = MONTHS;
    personnels: PersonnelModel[] = [];
    personnelSelected: PersonnelModel = new PersonnelModel();
    constructor(
        private transactionService: TransactionService,
        private personnelService: PersonnelService,
        private router: Router,
        private toast: HotToastService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getAllPersonnels();
    }

    getAllPersonnels() {
        this.personnelService.getAll().subscribe(
            (data) => {
                console.log(data);
                this.personnels = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getPersonnelSelected(event: any) {
        console.log(event.value);
        this.personnelSelected = event.value;
    }

    getError(field: NgModel) {
        return FormValidator.getError(field);
    }

    isValid(field: NgModel) {
        return FormValidator.isValid(field);
    }

    getDate(value: any) {
        console.log(value);
        this.payment.paymentDate = value;
    }

    save(form: NgForm) {
        this.submitted = true;
        console.log(form.value);
        if (form.invalid) {
            return;
        }
        let transaction: TransactionModel = new TransactionModel();
        transaction = form.value;
        transaction.type = TransactionType.PAYMENT;
        transaction.personnel = this.personnelSelected.firstname!.concat(' ').concat(this.personnelSelected.lastname!);
        transaction.cin = this.personnelSelected.cin;
        this.transactionService
            .save(transaction)
            .pipe(
                this.toast.observe({
                    loading: 'Enregistrement en cours ...',
                    success: 'Payement enregistré avec succès',
                    error: ({ message }) => `${message}`
                })
            )
            .subscribe(
                (data) => {
                    console.log(data);
                    this.dialog.closeAll();
                    this.router.navigateByUrl('/');
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
