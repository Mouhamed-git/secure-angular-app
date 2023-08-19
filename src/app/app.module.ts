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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaymentComponent } from './shared/components/payment/payment.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './routes/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
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
