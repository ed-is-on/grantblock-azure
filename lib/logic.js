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
        {name:'Albus', amount:552580.79, id:'1'},
        {name:'Cornelius', amount:1059666.61, id:'2'},
        {name:'Draco', amount:3746763.66, id:'3'},
        {name:'Ginny', amount:1206566.88, id:'4'},
        {name:'Hermione', amount:2305617.51, id:'5'},
        {name:'Lavender', amount:18890565.56, id:'6'},
        {name:'Minerva', amount:982191.49, id:'7'},
        {name:'Myrtle', amount:4060225.18, id:'8'},
        {name:'Petunia', amount:11120974.36, id:'9'},
        {name:'Rosmerta', amount:9376213.22, id:'10'},
        {name:'Rufus', amount:6223489.79, id:'11'},
        {name:'Seamus', amount:2782661.81, id:'12'},
        {name:'Severus', amount:883738.57, id:'13'},
        {name:'Sirius', amount:453905.38, id:'14'},
        {name:'Viktor', amount:2924785.81, id:'15'},
        {name:'Bellatrix', amount:780058.94, id:'16'},
        {name:'Fleur', amount:715296.56, id:'17'},
        {name:'Arthur', amount:4388182.29, id:'18'},
        {name:'Luna', amount:974080.14, id:'19'},
        {name:'Angelina', amount:1131859.12, id:'20'},
        {name:'Cedric', amount:331334.34, id:'21'}
    ]

    const grantees2 = [];

    for(const wizard of wizards){
        const newGrantee = factory.newResource(NS,'Grantee', wizard.id);
        
        newGrantee.numActionReqs = 1;
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

    const grantee = factory.newResource(NS,'Grantee',params.granteeId);
    grantee.granteeId = grantee.getIdentifier();
    grantee.grantBalance = 0;
    grantee.pocName = params.pocName;
    grantee.pocEmail = params.pocEmail;
    grantee.numActionReqs = 0;
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
    education.userId = education.getIdentifier();
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
    
    var params =arParams;

    const arRegistry = await getAssetRegistry(NS + '.ActionRequest');
    
    const creationDate = new Date();

    const actionReq = factory.newResource(NS, 'ActionRequest', (creationDate + arParams.requestor.getIdentifier()+ "AR" + params.requestor.numActionReqs));

    const granteeRegistry = await getParticipantRegistry(NS + '.Grantee');
    var requestor = params.requestor;
    requestor.numActionReqs = params.numActionReqs+1;
    granteeRegistry.update(requestor);

    actionReq.requestId = actionReq.getIdentifier();
    actionReq.requestValue = params.requestValue;
    
    actionReq.assignedValidators = [];
    actionReq.assignedValidators.push(params.requestor);
    actionReq.approvedValidators = [];
    actionReq.approvedValidators.push(params.requestor);

    //actionReq.owner = factory.newRelationship(NS, 'Grantee', params.requestor.getIdentifier());
    actionReq.treasuryValidator = false;
    await arRegistry.add(actionReq);
 }