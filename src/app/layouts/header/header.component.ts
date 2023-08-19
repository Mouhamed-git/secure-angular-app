import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentComponent } from '../../shared/components/payment/payment.component';
import { AuthService } from '../../services/auth.service';
import {OutflowComponent} from "../../shared/components/outflow/outflow.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private dialog: MatDialog,
                private router: Router,
                private authService: AuthService) {}

    ngOnInit(): void {
      console.log(this.authService.isLoggedIn)
    }

    openPaymentDialog(): void {
        this.dialog.open(PaymentComponent, {
            width: '30%'
            // data: {name: this.name, animal: this.animal},
        });
    }

    openOutflowDialog(): void {
        this.dialog.open(OutflowComponent, {
            width: '30%'
            // data: {name: this.name, animal: this.animal},
        });
    }

    logout() {
        this.authService.signOut().subscribe({
          next:   (data) => {
            console.log(data);
            this.router.navigateByUrl('login').then(console.log);
          },
          error: (error) => {
            console.log(error);
          }
        }

        );
    }

    goToHome() {
        this.router.navigateByUrl('/');
    }
}
