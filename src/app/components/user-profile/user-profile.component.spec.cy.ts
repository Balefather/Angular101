import { mount } from "cypress/angular";
import { UserProfileComponent } from "./user-profile.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CRUD Users', () => {
  beforeEach(() => {
    mount(UserProfileComponent, {
      imports: [HttpClientTestingModule]
    });
  });

  it('can toggle popup', () => {
    cy.get('.cy-userbutton').click();
    cy.get('.cy-popup-notloggedin').should('exist');
    cy.get('.cy-userbutton').click();
    cy.get('.cy-popup-notloggedin').should('not.exist');
  });

  it('can login', () => {
    // Intercept the login request and assign an alias
    cy.intercept('POST', 'https://www.shiggy.dk/api/users/login').as('loginRequest');
  
    cy.get('.cy-userbutton').click();
    cy.get('.cy-username-input').type('superadministrator');
    cy.get('.cy-password-input').type('test');
    cy.get('.cy-login-button').click();
  
    // Wait for the login request to complete
    cy.wait('@loginRequest');
  
    // Verify the token in localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('jwtToken');
      expect(token).to.not.be.null;
    });
  
    cy.get('.cy-userbutton').click();
    cy.get('.cy-popup-loggedin').should('exist');
  });
  
  
});
