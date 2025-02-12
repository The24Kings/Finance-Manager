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

describe("Category data validation", () => {
	const data = "Other";

	it("Test the data validation", () => {
		cy.visit('/debug')
		cy.get(".category-validation").get("ion-input").type(data);
		cy.get(".category-validation").get(".validate").click();
		cy.get(".category-validation").get("p").contains(data);
	});
});

describe("Incorrect category alert", () => {
	const data = "Invalid";

	it("Test the data validation", () => {
		cy.visit('/debug')
		cy.get(".category-validation").get("ion-input").type(data);
		cy.get(".category-validation").get(".validate").click();
		cy.on('window:alert', (str) => {
			expect(str).to.contain(`Subcategory "${data}" not found.`);
		});
	});
});
