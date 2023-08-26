import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./routes/home/home.module').then((m) => m.HomeModule),
        ...canActivate(redirectToLogin)
    },

    {
        path: 'login',
        loadChildren: () => import('./routes/login/login.module').then((m) => m.LoginModule),
        ...canActivate(redirectToHome)
    },

    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
