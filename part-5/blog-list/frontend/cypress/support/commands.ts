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
Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username: username,
        password: password,
    }).then(req => {
        localStorage.setItem('user', JSON.stringify({
            username: username,
            token: req.body.token
        }));
        cy.visit('http://localhost:3000');
    });
});

Cypress.Commands.add('createBlog', (title, author, url) => {
    // create blog in backend
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs', 
        body: {
            title: title,
            author: author,
            url: url
        },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
});
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

export { };

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            createBlog(title: string, author: string, url: string): Chainable<void>;
        }
    }
}