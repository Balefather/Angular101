/// <reference types="cypress" />


//When we use Typescript everything needs an interface to be described. 
//Cypress has its Chainable interface but you wish it to have a 'login' property too. 
//With this code, you are saying that you want to extend 'Cypress.Chainable' 
//to have a login property.

export {}
declare global {
    namespace Cypress {
        interface Chainable {
            login(email:string, password:string, expectedRole:string): Chainable<void>;
            logout(): Chainable<void>;
        }
    }
}