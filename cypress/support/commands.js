// ***********************************************
// This example commands.js shows you how to
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

// SUCCESS COMMANDS ---

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user = {
    firstName: 'John', 
    lastName: 'Doe', 
    email: 'john.doe@example.com', 
    comment: 'This is a test comment.'
}) => {
    cy.clock()
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[type="email"]').type(user.email)
    cy.get('textarea[id="open-text-area"]').type(user.comment, {delay:100})
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithoutArgument', () => {
    cy.clock()
    cy.get('input[name="firstName"]').type('Vinicius')
    cy.get('input[name="lastName"]').type('Lourenço')
    cy.get('input[type="email"]').type('vini@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('Obrigado!', {delay:100})
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
})

// ERROR COMMANDS ---

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithoutMandatoryTelephone', () => {
    cy.clock()
    cy.get('input[name="firstName"]').type('Vinicius')
    cy.get('input[name="lastName"]').type('Lourenço')
    cy.get('input[type="email"]').type('vini@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('Obrigado!', {delay:100})
    cy.get('input[type="checkbox"][value="phone"').check().should('be.checked')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
})