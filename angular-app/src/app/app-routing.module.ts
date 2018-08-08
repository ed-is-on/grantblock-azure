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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ActionRequest', component: ActionRequestComponent },
  { path: 'Education', component: EducationComponent },
  { path: 'Treasury', component: TreasuryComponent },
  { path: 'Grantee', component: GranteeComponent },
  { path: 'SetUpDemo', component: SetUpDemoComponent },
  { path: 'CreateGrantee', component: CreateGranteeComponent },
  { path: 'CreateEdUser', component: CreateEdUserComponent },
  { path: 'CreateTreasury', component: CreateTreasuryComponent },
  { path: 'ImportGrantee', component: ImportGranteeComponent },
  { path: 'ObligateSlate', component: ObligateSlateComponent },
  { path: 'CreateActionRequest', component: CreateActionRequestComponent },
  { path: 'AddValidatingGrantees', component: AddValidatingGranteesComponent },
  { path: 'ApproveActionRequest', component: ApproveActionRequestComponent },
  { path: 'VerifyActionRequest', component: VerifyActionRequestComponent },
  { path: 'Home', component: GranteeViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
