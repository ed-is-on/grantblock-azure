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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('network-name should be dev-edgrants-network@0.0.58',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('dev-edgrants-network@0.0.58.bna');
    });
  });

  it('navbar-brand should be angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app');
    });
  });

  
    it('ActionRequest component should be loadable',() => {
      page.navigateTo('/ActionRequest');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ActionRequest');
      });
    });

    it('ActionRequest table should have 10 columns',() => {
      page.navigateTo('/ActionRequest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Education component should be loadable',() => {
      page.navigateTo('/Education');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Education');
      });
    });

    it('Education table should have 4 columns',() => {
      page.navigateTo('/Education');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Treasury component should be loadable',() => {
      page.navigateTo('/Treasury');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Treasury');
      });
    });

    it('Treasury table should have 4 columns',() => {
      page.navigateTo('/Treasury');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Grantee component should be loadable',() => {
      page.navigateTo('/Grantee');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Grantee');
      });
    });

    it('Grantee table should have 5 columns',() => {
      page.navigateTo('/Grantee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('SetUpDemo component should be loadable',() => {
      page.navigateTo('/SetUpDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetUpDemo');
      });
    });
  
    it('CreateGrantee component should be loadable',() => {
      page.navigateTo('/CreateGrantee');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateGrantee');
      });
    });
  
    it('CreateEdUser component should be loadable',() => {
      page.navigateTo('/CreateEdUser');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateEdUser');
      });
    });
  
    it('CreateTreasury component should be loadable',() => {
      page.navigateTo('/CreateTreasury');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateTreasury');
      });
    });
  
    it('ImportGrantee component should be loadable',() => {
      page.navigateTo('/ImportGrantee');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ImportGrantee');
      });
    });
  
    it('ObligateSlate component should be loadable',() => {
      page.navigateTo('/ObligateSlate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ObligateSlate');
      });
    });
  
    it('CreateActionRequest component should be loadable',() => {
      page.navigateTo('/CreateActionRequest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateActionRequest');
      });
    });
  
    it('AddValidatingGrantees component should be loadable',() => {
      page.navigateTo('/AddValidatingGrantees');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddValidatingGrantees');
      });
    });
  
    it('ApproveActionRequest component should be loadable',() => {
      page.navigateTo('/ApproveActionRequest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveActionRequest');
      });
    });
  
    it('VerifyActionRequest component should be loadable',() => {
      page.navigateTo('/VerifyActionRequest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('VerifyActionRequest');
      });
    });
  

});