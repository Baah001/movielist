// cypress/support/commands.d.ts

declare namespace Cypress {
  interface Chainable {
    /**
     * Navigates to the home page
     */
    visitHome(): Chainable<void>;
    /**
     * Mocks an API call with a specific fixture.
     * @param fixture - The name of the fixture file.
     */
    mockApi(fixture: string): Chainable<void>;
  }
}
