import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../shared/models/auth-model';
import { FormValidator } from '../../utils/form-validator-utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    showPassword: boolean = false;
    request: AuthRequest = new AuthRequest();
    submitted: boolean = false;

    constructor(public authService: AuthService, private router: Router, private toast: HotToastService) {}

    ngOnInit(): void {}

    getError(field: NgModel) {
        return this.submitted && FormValidator.getError(field);
    }

    isValid(field: NgModel) {
        return this.submitted && FormValidator.isValid(field);
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    login(form: NgForm) {
      this.submitted = true;
        console.log(form.value);
        if (form.invalid) {
            return;
        }
        this.authService
            .signIn(form.value)
            .pipe(
                this.toast.observe({
                    loading: 'Connexion en cours...',
                    success: 'Connexion réussi',
                    error: 'Email/Mot de passe incorrect'
                })
            )
            .subscribe({
                next: (data) => {
                    console.log('data : ', data);
                    this.router.navigateByUrl('/');
                },
                error: (error) => {
                  console.log(error);
                }
            });
    }
}
