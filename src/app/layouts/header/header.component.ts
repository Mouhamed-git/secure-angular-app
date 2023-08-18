import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DecaissementComponent } from '../../shared/components/decaissement/decaissement.component';
import { PaymentComponent } from '../../shared/components/payment/payment.component';
import { AuthService } from '../../services/auth.service';

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

    openDecaissementDialog(): void {
        this.dialog.open(DecaissementComponent, {
            width: '30%'
            // data: {name: this.name, animal: this.animal},
        });
    }

    logout() {
        this.authService.signOut().subscribe(
            (data) => {
                console.log(data);
                this.router.navigateByUrl('login');
            },
            (erorr) => {
                console.log(erorr);
            }
        );
    }

    goToHome() {
        this.router.navigateByUrl('/');
    }
}
