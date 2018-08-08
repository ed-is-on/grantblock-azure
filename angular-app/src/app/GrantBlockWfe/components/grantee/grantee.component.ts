import { Component, OnInit } from '@angular/core'
// import { GranteeService } from '../../services/grantee.service'
import { GranteeService } from '../../../Grantee/Grantee.service'
import { Grantee } from '../../models/grantee.model';


@Component({
  selector: 'grantee-view',
  templateUrl: './grantee.component.html',
  styleUrls: ['./grantee.component.css', '../../app/app.component.css'],
  providers: [GranteeService]
})
export class GranteeViewComponent implements OnInit {

  grantee: Grantee;
  allGrantees: Grantee[];

  constructor(
    private $granteeService: GranteeService
  ) { }

  ngOnInit(){
    this.GetAllGrantees();
  }
  
  // GetAllGrantees():Grantee[]{
  //   return this.$granteeService.GetAllGrantees().sort((x,y)=>{if(x.Name < y.Name){return -1}else{return 1}});
  // }
  
  GetAllGrantees(){
    const _allGrantees:Grantee[] = [];
    return this.$granteeService.getAll()
        .subscribe((result)=>{
          console.log(result);
            result.forEach(participant => {
              _allGrantees.push(
                new Grantee(participant.pocName,participant.grantBalance,participant.userId,participant.pocEmail)
              )
            });
            console.log(_allGrantees);
            this.allGrantees = _allGrantees.sort((x,y)=>{if(x.Name < y.Name){return -1}else{return 1}});
        })
  }

  UpdateSelectedGrantee(_grantee){
    this.grantee = _grantee
  }
  
}

