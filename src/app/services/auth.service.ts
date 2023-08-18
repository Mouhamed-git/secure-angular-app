import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from } from 'rxjs';
import { AuthModel } from '../shared/models/auth-model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser = authState(this.auth);

    constructor(private auth: Auth) {}

    signIn(authModel: AuthModel) {
        return from(signInWithEmailAndPassword(this.auth, authModel.email ?? '', authModel.password ?? ''));
    }

    signOut() {
        return from(this.auth.signOut());
    }

    get isLoggedIn(): boolean {
      return !!this.auth.currentUser;
    }
}
