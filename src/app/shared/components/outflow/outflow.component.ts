import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Outflow} from '../../models/outflow.model';
import { OutflowType } from '../../enums/decaissement-type.enums';
import { FormValidator } from '../../../utils/form-validator-utils';
import { TransactionService } from '../../../services/transaction.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Transaction } from '../../models/transaction.model';
import { TransactionType } from '../../enums/transaction-type.enums';
import { Router } from '@angular/router';
import { PersonnelService } from '../../../services/personnel.service';
import { Personnel } from '../../models/personnel.model';

@Component({
    selector: 'app-outflow',
    templateUrl: './outflow.component.html',
    styleUrls: ['./outflow.component.scss']
})
export class OutflowComponent implements OnInit {
    outflow: Outflow = new Outflow();
    outflowTypes: OutflowType[] = [
      OutflowType.MISSION,
      OutflowType.PURCHASE,
      OutflowType.VARIOUS
    ];
    personnels: Personnel[] = [];
    personnelSelected: Personnel = new Personnel();
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
        this.personnelService.getAll()
          .subscribe({
          next:  (data) => {
            console.log(data);
            this.personnels = data;
          },
          error: (error) => {
            console.log(error);
          }
        });
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
        let transaction: Transaction;
        transaction = form.value;
        transaction.type = TransactionType.DECAISSEMENT;
        transaction.personnel = this.personnelSelected.firstname!.concat(` ${this.personnelSelected.lastname!}`);
        transaction.cin = this.personnelSelected.cin;
        this.transactionService
            .save(transaction)
            .pipe(
                this.toast.observe({
                    loading: 'Enregistrement en cours ...',
                    success: 'Décaissement enregistré avec succès',
                    error: ({ message }) => `${message}`
                })
            )
            .subscribe({
              next: (data) => {
                console.log(data);
                this.dialog.closeAll();
                this.router.navigateByUrl('/').then(console.log);
              },
              error: (error) => {
                console.log(error);
              }
            });
    }
}
