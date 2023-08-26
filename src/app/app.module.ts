import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { LoginModule } from './routes/login/login.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { TransactionService } from './services/transaction.service';
import {HomeModule} from "./routes/home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HomeModule,
        LoginModule,
        MatToolbarModule,
        MatIconModule,
        HotToastModule.forRoot(),
        provideFirestore(() => getFirestore())
    ],
    providers: [AuthService, TransactionService],
    bootstrap: [AppComponent]
})
export class AppModule {}
