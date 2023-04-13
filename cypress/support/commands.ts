/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


//remember to update index.d.ts with new commands

Cypress.Commands.add('login', (username, password, expectedRole) => {
    cy.session([username, password], () => {
        cy.visit('https://localhost:4200/dashboard')
        cy.get('.button').click()
        cy.get('#username-input').type(username)
        cy.get('#password-input').type(password)
        cy.get('.login-button').click().should(() => {
            expect(localStorage.getItem('roles')||'').to.eq(expectedRole)
        })
        //shouldn't wait here, but currently needed for it to work
/*         cy.wait(100) */
        
    })

/*     cy.getAllLocalStorage().then((result) => {
        expect(result).to.deep.equal({
            'https://localhost:4200': {
                roles: 'admin',
            },
        })
    }) */
})

//this is probably never needed at all, but there might be a use for it at some point
Cypress.Commands.add('logout', () => {
    cy.visit('https://localhost:4200/dashboard')
    cy.get('.button').click()
    cy.get('.logout-button').click()
})

