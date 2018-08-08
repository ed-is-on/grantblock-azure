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

'use strict';
/**
 * Write your transction processor functions here
 */

// /**
//  * Sample transaction
//  * @param {com.usgov.ed.grants.SampleTransaction} sampleTransaction
//  * @transaction
//  */
// async function sampleTransaction(tx) {
//     // Save the old value of the asset.
//     const oldValue = tx.asset.value;

//     // Update the asset with the new value.
//     tx.asset.value = tx.newValue;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('com.usgov.ed.grants.SampleAsset');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(tx.asset);

//     // Emit an event for the modified asset.
//     let event = getFactory().newEvent('com.usgov.ed.grants', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }

// Set the namespace globally
const NS = 'com.usgov.ed.grants';

/**
 * Sample transaction
 * @param {com.usgov.ed.grants.SetUpDemo} setupParams
 * @transaction
 */
async function setUpDemo(setupParams) {
    const balance = setupParams.grantBalance;
    const factory = getFactory();

    var wizards = [
        {name:'Albus', amount:552580.79, id:'g1'},
        {name:'Cornelius', amount:1059666.61, id:'g2'},
        {name:'Draco', amount:3746763.66, id:'g3'},
        {name:'Ginny', amount:1206566.88, id:'g4'},
        {name:'Hermione', amount:2305617.51, id:'g5'},
        {name:'Lavender', amount:18890565.56, id:'g6'},
        {name:'Minerva', amount:982191.49, id:'g7'},
        {name:'Myrtle', amount:4060225.18, id:'g8'},
        {name:'Petunia', amount:11120974.36, id:'g9'},
        {name:'Rosmerta', amount:9376213.22, id:'g10'},
        {name:'Rufus', amount:6223489.79, id:'g11'},
        {name:'Seamus', amount:2782661.81, id:'g12'},
        {name:'Severus', amount:883738.57, id:'g13'},
        {name:'Sirius', amount:453905.38, id:'g14'},
        {name:'Viktor', amount:2924785.81, id:'g15'},
        {name:'Bellatrix', amount:780058.94, id:'g16'},
        {name:'Fleur', amount:715296.56, id:'g17'},
        {name:'Arthur', amount:4388182.29, id:'g18'},
        {name:'Luna', amount:974080.14, id:'g19'},
        {name:'Angelina', amount:1131859.12, id:'g20'},
        {name:'Cedric', amount:331334.34, id:'g21'}
    ]

    const grantees2 = [];

    for(const wizard of wizards){
        const newGrantee = factory.newResource(NS,'Grantee', wizard.id);
        
        // newGrantee.numActionReqs = 1;
        newGrantee.grantBalance = wizard.amount;
        newGrantee.pocName = wizard.name;
        newGrantee.pocEmail = wizard.name.toLowerCase() + '@hogwarts.edu';
        // newGrantee.userId = await newGrantee.getIndentifier();
        
        grantees2.push(newGrantee);
    }

    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll(grantees2);

    const eduser = factory.newResource(NS, 'Education', 'ed');
    eduser.userId = eduser.getIdentifier();
    eduser.pocName = 'Emma Education';
    eduser.pocEmail = 'eedu@ed.gov';
    const educationRegistry = await getParticipantRegistry(NS + '.Education');
    await educationRegistry.addAll([eduser]);

    const treasury = factory.newResource(NS, 'Treasury', 'treasury');
    treasury.userId = treasury.getIdentifier();
    treasury.pocName = 'Tommy Treasury';
    treasury.pocEmail = 'ttreas@treasury.gov';
    const treasuryRegistry = await getParticipantRegistry(NS + '.Treasury');
    await treasuryRegistry.addAll([treasury]);
}

/**
 * Obligate Slate - Assign funds to each of the grantees based on their id
 * @param {com.usgov.ed.grants.ObligateSlate} slateParams
 * @transaction
 */
async function obligateSlate(slateParams){
    const _slate = slateParams.slate || [
        // {granteeId:,allottedAmount:}
    ]
}

/**
 * Create Grantee - this will generate a new grantee's profile
 * @param {com.usgov.ed.grants.CreateGrantee} granteeParams
 * @transaction
 */
async function createGrantee(granteeParams){
    const factory = getFactory();

    var params = granteeParams;

    const grantee = factory.newResource(NS,'Grantee', params.userId);
    // grantee.userId = grantee.getIdentifier();
    grantee.grantBalance = 0;
    grantee.pocName = params.pocName;
    grantee.pocEmail = params.pocEmail;
    // grantee.numActionReqs = 0;
    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    await granteeRegistry.addAll([grantee]);
    
}

 /**
  * Create Education -- this will generate a new Department of Education user
  * @param {com.usgov.ed.grants.CreateEdUser} edParams
  * @transaction
  */
 async function createEdUser(edParams){
    const factory = getFactory();
    // const NS = 'com.usgov.ed.grants';

    var params = edParams;

    const education = factory.newResource(NS, 'Education', params.userId);
    // education.userId = education.getIdentifier();
    education.pocName = params.pocName;
    education.pocEmail = params.pocEmail;
    const educationRegistry = await getParticipantRegistry(NS + '.Education');
    await educationRegistry.addAll([education]);
 }

 /**
  * Create Action Request -- this one is a little trickier b/c some of the randomness and rules involved.
  * @param {com.usgov.ed.grants.CreateActionRequest} arParams
  * @transaction
  */
 async function createActionRequest(arParams){
    const factory = getFactory();
    // const NS = 'com.usgov.ed.grants';
    
    // var params =arParams;

    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    const gRegistry = await getParticipantRegistry(NS + '.Grantee');
    
    var creationDate = new Date().toString();

    // This code should put the date in the correct format
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var hr = today.getHours();
    if(hr<10){
        hr='0'+hr;
    }
    var min = today.getMinutes();
    if(min<10){
        min='0'+min;
    }
    var sec = today.getSeconds();
    if(sec<10){
        sec='0'+sec;
    }
    var today = yyyy+mm+dd+hr+min+sec;
    creationDate = today.toString();

    var requestorId = arParams.requestor.getIdentifier().toString();
    
    const actionReq = factory.newResource(NS, 'ActionRequest', (requestorId + "AR" + creationDate ));

    actionReq.status = "INITIALIZED";
    // actionReq.requestId = actionReq.getIdentifier();
    // console.log(actionReq.requestId) // for debugging

    // Check to see if the requested amount is valid
    var reqValue = arParams.requestValue;
    var grantee = await gRegistry.get(arParams.requestor.userId);
    var gBalance = grantee.grantBalance;
    if(reqValue <= gBalance){
        actionReq.requestValue = arParams.requestValue;
        grantee.grantBalance = grantee.grantBalance-reqValue;
    }else{
        throw new Error('Requested amount exceeds available balance!');
    }

    actionReq.assignedValidators = [];
    actionReq.approvedValidators = [];
    // actionReq.assignedValidators.push(arParams.requestor);
    // actionReq.approvedValidators.push(arParams.requestor);

    //actionReq.owner = factory.newRelationship(NS, 'Grantee', arParams.requestor.getIdentifier());
    actionReq.treasuryValidator = false;

    actionReq.owner = factory.newRelationship(NS,'Grantee', arParams.requestor);

    await arRegistry.add(actionReq);
    await gRegistry.update(grantee);
 }

 /**
 * Populate Action Request Approvers - this call will randomly select two participants from the grantee list and add them to the assigned validators field
 * @param {com.usgov.ed.grants.AddValidatingGrantees} validatorParams
 * @transaction
 */
 async function addValidatingGrantees(validatorParams){
    const numValidators = validatorParams.validators;
    const actionRequestId = validatorParams.request.getIdentifier().toString();

    // Get the grantee and action request registries
    const arRegistry = await getAssetRegistry(NS+'.ActionRequest');
    var currentReq = await arRegistry.get(actionRequestId);

    // Create an array of all grantees
    const gRegistry = await getParticipantRegistry(`${NS}.Grantee`);
    const allGrantees = await gRegistry.getAll();
    
    // remove the owner from the contention for validation
    var ownerId = currentReq.owner.userId;
    // Return array of grantee Ids
    granteeList = allGrantees.map(x=>{return x.userId})
    // Get index of action request owner
    var ownerIndex = granteeList.indexOf(ownerId);

    if(ownerIndex > -1){
        granteeList.splice(ownerIndex,1);
    }

    // CHECK 1 - Does the record already have validators? If so, how many more does it need and ensure no duplicates
    if(currentReq.status === "VALIDATORS_SELECTED"){
        throw new Error("You already selected the validators for this request.");
    }

    // CHECK 2 - Are there enough different grantees in the registry for the number of validators requested?
    var validatorCount = numValidators;
    if(numValidators > granteeList.length){
        throw new Error("You're asking for more validators than there are grantees.");
    }

    var validatorIndexes = [];
    while(validatorCount>0){
        var randomInt = Math.floor(Math.random()*granteeList.length);
        if(validatorIndexes.includes(randomInt)===true){

        }else{
            validatorIndexes.push(randomInt);
            validatorCount--;
        }
    }

    // If everything else has gone well at this point, just get everything, push it and decrement accordingly
    var secondCount = validatorIndexes.length;
    for(var x=0; x<secondCount; x++){
        var recNo = granteeList[validatorIndexes[x]];
        var pushReq = await gRegistry.get(recNo);
        currentReq.assignedValidators.push(pushReq);
    }

    currentReq.status = "VALIDATORS_SELECTED";
    await arRegistry.update(currentReq);

    // emit an event that this action request has been created
    const creationNotification = getFactory().newEvent('com.usgov.ed.grants','NotifyValidators');
    creationNotification.request = currentReq;
    emit(creationNotification);
 }

 /**
  * Approve Action Request - takes the ID of the person and a value (true or false) to show approval or disapproval and moves the ID to approval accordingly
  * @param {com.usgov.ed.grants.ApproveActionRequest} approveParams
  * @transaction
  */
 async function approveActionRequest(approveParams){

    const approver = approveParams.approver;
    const approved = approveParams.approved;
    var currentReqId = approveParams.request.requestId;

    const arRegistry = await getAssetRegistry(`${NS}.ActionRequest`);
    const currentReq = await arRegistry.get(currentReqId);

    var identifier = currentReq.owner.getIdentifier();
    identifier = identifier.substring((identifier.indexOf("#")+1),(identifier.indexOf("}")));

    const gRegistry = await getParticipantRegistry(`${NS}.Grantee`);
    // const recOwner = await gRegistry.get(approveParams.arOwner.userId);
    const recOwner = await gRegistry.get(identifier);

    if(currentReq.receiptHash===approveParams.receiptHash){

    } else {
        throw new Error('Receipt hashes do not match!');
    }

    if(approved === true && currentReq.status !== "REJECTED"){
        currentReq.approvedValidators.push(approver);

        if(currentReq.approvedValidators === currentReq.assignedValidators){
            currentReq.status = "APPROVED";
        }else{
            currentReq.status = "VALIDATION_IN_PROGRESS";
        }
    } else {
        // emit an event to action request owner notifying them of rejection
        if(currentReq.status === "REJECTED"){

        }else{
            recOwner.grantBalance = recOwner.grantBalance + currentReq.requestValue;
            currentReq.status="REJECTED";
        }
    }

    await gRegistry.update(recOwner);
    await arRegistry.update(currentReq);
 }