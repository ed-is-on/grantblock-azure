/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './material.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ActionRequestComponent } from './ActionRequest/ActionRequest.component';

import { EducationComponent } from './Education/Education.component';
import { TreasuryComponent } from './Treasury/Treasury.component';
import { GranteeComponent } from './Grantee/Grantee.component';

import { SetUpDemoComponent } from './SetUpDemo/SetUpDemo.component';
import { CreateGranteeComponent } from './CreateGrantee/CreateGrantee.component';
import { CreateEdUserComponent } from './CreateEdUser/CreateEdUser.component';
import { CreateTreasuryComponent } from './CreateTreasury/CreateTreasury.component';
import { ImportGranteeComponent } from './ImportGrantee/ImportGrantee.component';
import { ObligateSlateComponent } from './ObligateSlate/ObligateSlate.component';
import { CreateActionRequestComponent } from './CreateActionRequest/CreateActionRequest.component';
import { AddValidatingGranteesComponent } from './AddValidatingGrantees/AddValidatingGrantees.component';
import { ApproveActionRequestComponent } from './ApproveActionRequest/ApproveActionRequest.component';
import { VerifyActionRequestComponent } from './VerifyActionRequest/VerifyActionRequest.component';

// WFE Components
import { GranteeViewComponent } from './GrantBlockWfe/components/grantee/grantee.component';
import { GranteeTransactionsComponent } from './GrantBlockWfe/components/grantee-transactions/grantee-transactions.component';
import { TransactionDialogComponent } from './GrantBlockWfe/components/dialogs/transaction/transaction.dialog.component';



  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActionRequestComponent,
    EducationComponent,
    TreasuryComponent,
    GranteeComponent,
    SetUpDemoComponent,
    CreateGranteeComponent,
    CreateEdUserComponent,
    CreateTreasuryComponent,
    ImportGranteeComponent,
    ObligateSlateComponent,
    CreateActionRequestComponent,
    AddValidatingGranteesComponent,
    ApproveActionRequestComponent,
    VerifyActionRequestComponent,
    // WFE Components
    GranteeViewComponent,
    TransactionDialogComponent,
    GranteeTransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule
  ],
  providers: [
    DataService
  ],
  entryComponents:[
    TransactionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
