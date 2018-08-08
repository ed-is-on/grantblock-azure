import { Injectable } from '@angular/core';
import { GranteeService } from '../../Grantee/Grantee.service';
import { Transactions } from '../models/transactions.model';
import { TransactionApprover } from '../models/approver.model';
import { Grantee } from '../models/grantee.model';
import $dataFactory from '../data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TransactionsService {

  constructor(
    private $granteeService: GranteeService
  ) {
    this.AssignApprovers();
  }

  private transactionsList: Transactions[] = [
    new Transactions('1', 'Albus', 186.61, new Date('10/4/16')),
    new Transactions('1', 'Albus', 30500, new Date('10/17/16')),
    new Transactions('1', 'Albus', 102.9, new Date('10/21/16'))
  ]

  GetAllGrantees():Observable<Grantee[]>{
    const _allGrantees:Grantee[] = [];
    this.$granteeService.getAll()
        .subscribe((result)=>{
        //   console.log(result);
            result.forEach(participant => {
              _allGrantees.push(
                new Grantee(participant.pocName,participant.grantBalance,participant.userId,participant.pocEmail)
              )
            });
            // console.log(_allGrantees);
            return of(_allGrantees.sort((x,y)=>{if(x.Name < y.Name){return -1}else{return 1}}));
        })
    return of(_allGrantees);
  }

  PopulateTransactionsList(_numberOfTransactions: number) {
    this.GetAllGrantees().subscribe((allGrantees)=>{
        console.log('All Grantees: ',allGrantees)
        for (var i = 0; i < _numberOfTransactions; i++) {
          let id = Math.floor(Math.random() * allGrantees.length);
          console.log(id);
          let wizard = allGrantees[id];
          this.transactionsList.push(new Transactions(wizard.Id, wizard.Name, wizard.Amount));
        }
    });
  }

  GetGranteesTransactions(_granteeId) {
    return $dataFactory.transactions.filter((_trans) => { return _trans.granteeId === _granteeId && _trans.date.getFullYear() >= new Date('1/1/2017').getFullYear() })
  }

  GetGranteesAvailableBalance(_granteeId, _amount, _transactions?: Transactions[]) {
    let selectedTransactions: number[] = [];
    let availableBalance: number;
    const transactions = _transactions || $dataFactory.transactions.filter((_trans) => {
      return _trans.granteeId === _granteeId && _trans.date.getFullYear() >= new Date('1/1/2017').getFullYear()
    });
    transactions.forEach((_trans) => {
      selectedTransactions.push(_trans.amount);
    });
    if(selectedTransactions.length > 0){
        availableBalance = _amount + selectedTransactions
          .reduce(function (totalValue, currentValue) {
            return totalValue + currentValue;
          })
    }

    return availableBalance
  }

  AssignApprovers() {
    // this.transactionsList.map((_trans) => {
    //   _trans.approvers = this.SelectRandomApprovers(_trans.granteeId);
    // })
  }

  SelectRandomApprovers(_granteeId, _numberOfApprovers: number = 3) {
   this.GetAllGrantees().subscribe((allGrantees)=>{
       // If number of approvers requested is more than the number of existing approvers, set the input parameter to the max number of approvers
       _numberOfApprovers = _numberOfApprovers > allGrantees.length ? allGrantees.length : _numberOfApprovers;
       // Create array place holder for the approvers
       let _approvers: TransactionApprover[] = [];
   
       for (var i = 0; _approvers.length < _numberOfApprovers; i++) {
            let id = Math.floor(Math.random() * allGrantees.length);
            let wizard = allGrantees[id];
            // Make sure the approver is not the grantee and you are not selecting the same approver twice
            if (wizard.Id !== _granteeId && _approvers.map(x => { return x.approverId }).indexOf(wizard.Id) === -1) {
            // Create a new approver with a random number to represent the approval status (0 accepted, 1 rejected, 2 pending)
            _approvers.push(new TransactionApprover(wizard.Id, Math.floor(Math.random() * 3)))
            }
        }
        // return the created approvers
        return _approvers;
    });
  }

  getTransactions() {
    return this.transactionsList;
  }

  submitTransaction(
    _granteeId: string,
    _granteeName: string,
    _amount: number,
    _date?: Date
  ) {
    var newTran = new Transactions(
      _granteeId,
      _granteeName,
      _amount,
      _date || new Date()
    );

    this.transactionsList.push(newTran)
  }
}