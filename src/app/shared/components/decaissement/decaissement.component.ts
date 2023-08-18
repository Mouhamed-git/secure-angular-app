import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DecaissementModel } from '../../models/decaissement-model';
import { DecaissementType } from '../../enums/decaissement-type';
import { FormValidator } from '../../../utils/form-validator-utils';
import { TransactionService } from '../../../services/transaction.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { TransactionModel } from '../../models/transaction-model';
import { TransactionType } from '../../enums/transaction-type';
import { Router } from '@angular/router';
import { PersonnelService } from '../../../services/personnel.service';
import { PersonnelModel } from '../../models/personnel-model';

@Component({
    selector: 'app-decaissement',
    templateUrl: './decaissement.component.html',
    styleUrls: ['./decaissement.component.scss']
})
export class DecaissementComponent implements OnInit {
    decaissement: DecaissementModel = new DecaissementModel();
    decaissementTypes: DecaissementType[] = [
        DecaissementType.MISSION,
        DecaissementType.PURCHASE,
        DecaissementType.VARIOUS
    ];
    personnels: PersonnelModel[] = [];
    personnelSelected: PersonnelModel = new PersonnelModel();
    isMission: boolean = true;
    submitted: boolean = false;
    constructor(
        private transactionService: TransactionService,
        private personnelService: PersonnelService,
        private toast: HotToastService,
        private dialog: MatDialog,
        private router: Router
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
    getError(field: NgModel) {
        return FormValidator.getError(field);
    }

    isValid(field: NgModel) {
        return FormValidator.isValid(field);
    }

    getType(event: any) {
        console.log(event);

        let value = event.value;
        console.log(value);

        value && value.match(/mission/i) ? (this.isMission = true) : (this.isMission = false);
        console.log(this.isMission);
    }

    getPersonnelSelected(event: any) {
        console.log(event.value);
        this.personnelSelected = event.value;
    }

    getDate(value: any) {
        console.log(value);
    }

    save(form: NgForm) {
        this.submitted = true;
        console.log(form.value);
        if (form.invalid) {
            return;
        }
        let transaction: TransactionModel = new TransactionModel();
        transaction = form.value;
        transaction.type = TransactionType.DECAISSEMENT;
        transaction.personnel = this.personnelSelected.firstname!.concat(' ').concat(this.personnelSelected.lastname!);
        transaction.cin = this.personnelSelected.cin;
        this.transactionService
            .save(form.value)
            .pipe(
                this.toast.observe({
                    loading: 'Enregistrement en cours ...',
                    success: 'Décaissement enregistré avec succès',
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
