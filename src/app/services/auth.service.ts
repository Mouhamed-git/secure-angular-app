import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from } from 'rxjs';
import { AuthRequest } from '../shared/models/auth-model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser = authState(this.auth);

    constructor(private auth: Auth) {}

    signIn(request: AuthRequest) {
        return from(signInWithEmailAndPassword(this.auth, request.email ?? '', request.password ?? ''));
    }

    signOut() {
        return from(this.auth.signOut());
    }

    get isLoggedIn(): boolean {
      return !!this.auth.currentUser;
    }
}
