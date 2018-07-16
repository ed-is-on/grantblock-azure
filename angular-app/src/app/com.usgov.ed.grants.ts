import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.usgov.ed.grants{
   export class Obligation {
      granteeId: string;
      allottedAmount: number;
   }
   export abstract class User extends Participant {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class Education extends User {
   }
   export class Treasury extends User {
   }
   export class Grantee extends User {
      granteeId: string;
      grantBalance: number;
      numActionsReqs: number;
   }
   export class program1grantee extends Grantee {
   }
   export class program2grantee extends Grantee {
   }
   export class ActionRequest extends Asset {
      requestId: string;
      requestValue: number;
      owner: Grantee;
      assignedValidators: Grantee[];
      approvedValidators: Grantee[];
      treasuryValidator: boolean;
   }
   export class CreateGrantee extends Transaction {
      granteeId: string;
      grantBalance: number;
      pocName: string;
      pocEmail: string;
   }
   export class CreateEdUser extends Transaction {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class CreateTreasury extends Transaction {
      userId: string;
      pocName: string;
      pocEmail: string;
   }
   export class ImportGrantee extends Transaction {
      granteeId: string;
      grantBalance: number;
      pocName: string;
      pocEmail: string;
   }
   export class ObligateSlate extends Transaction {
      slate: Obligation[];
   }
   export class CreateActionRequest extends Transaction {
      requestValue: number;
      validators: number;
      requestor: Grantee;
   }
   export class VerifyActionRequest extends Transaction {
   }
   export class ApproveActionRequest extends Transaction {
   }
   export class SetUpDemo extends Transaction {
      grantBalance: number;
   }
   export class NotifyDisbursement extends Event {
   }
   export class NotifyApprovers extends Event {
      verifierid: string;
      req: ActionRequest;
   }
   export class NotifyTreasury extends Event {
      req: ActionRequest;
   }
   export class ActionRequestMade extends Event {
      req: ActionRequest;
   }
// }
