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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GranteeService } from './Grantee.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-grantee',
  templateUrl: './Grantee.component.html',
  styleUrls: ['./Grantee.component.css'],
  providers: [GranteeService]
})
export class GranteeComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  grantBalance = new FormControl('', Validators.required);
  userId = new FormControl('', Validators.required);
  pocName = new FormControl('', Validators.required);
  pocEmail = new FormControl('', Validators.required);


  constructor(private serviceGrantee: GranteeService, fb: FormBuilder) {
    this.myForm = fb.group({
      grantBalance: this.grantBalance,
      userId: this.userId,
      pocName: this.pocName,
      pocEmail: this.pocEmail
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceGrantee.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'com.usgov.ed.grants.Grantee',
      'grantBalance': this.grantBalance.value,
      'userId': this.userId.value,
      'pocName': this.pocName.value,
      'pocEmail': this.pocEmail.value
    };

    this.myForm.setValue({
      'grantBalance': null,
      'userId': null,
      'pocName': null,
      'pocEmail': null
    });

    return this.serviceGrantee.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'grantBalance': null,
        'userId': null,
        'pocName': null,
        'pocEmail': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'com.usgov.ed.grants.Grantee',
      'grantBalance': this.grantBalance.value,
      'pocName': this.pocName.value,
      'pocEmail': this.pocEmail.value
    };

    return this.serviceGrantee.updateParticipant(form.get('userId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceGrantee.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceGrantee.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'grantBalance': null,
        'userId': null,
        'pocName': null,
        'pocEmail': null
      };

      if (result.grantBalance) {
        formObject.grantBalance = result.grantBalance;
      } else {
        formObject.grantBalance = null;
      }

      if (result.userId) {
        formObject.userId = result.userId;
      } else {
        formObject.userId = null;
      }

      if (result.pocName) {
        formObject.pocName = result.pocName;
      } else {
        formObject.pocName = null;
      }

      if (result.pocEmail) {
        formObject.pocEmail = result.pocEmail;
      } else {
        formObject.pocEmail = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'grantBalance': null,
      'userId': null,
      'pocName': null,
      'pocEmail': null
    });
  }
}
