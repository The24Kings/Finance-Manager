/// <reference types="cypress" />

describe("Database connectiong test", () => {
	it("Test the 'SEND DATA' button", () => {
		cy.visit('/debug')
    	cy.get(".database-test").click();
		cy.on('window:alert', (str) => {
			expect(str).to.contain('Document written with ID:')
		});
	});
});
