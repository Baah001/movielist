describe('Movies Overview', () => {
  beforeEach(() => {
    // Mock the API call for fetching Tom Hanks details
    cy.fixture('person-mock.json').then((data) => {
      cy.intercept(
        {
          method: 'GET',
          url: /\/3\/search\/person\?.*query=Tom%20Hanks.*/,
        },
        data,
      ).as('getPersonTomHanks');
    });

    // Mock the API call for fetching movies
    cy.fixture('movies-mock.json').then((data) => {
      cy.intercept(
        {
          method: 'GET',
          url: /\/3\/discover\/movie\?([^=]*=.*&)*with_cast=\d+(&.*)*/,
        },
        { body: data },
      ).as('getMovies');
    });
  });

  it('should load and display movies', () => {
    // Visit the homepage
    cy.visit('/');

    // Wait for API calls to complete
    cy.wait('@getPersonTomHanks');
    cy.wait('@getMovies');

    // Assert that movie cards are displayed
    cy.get('.movie-grid').should('exist').and('have.length.greaterThan', 0);

    // Assert that a specific movie is displayed
    cy.contains('Saving Private Ryan').should('exist');
  });

  it('should navigate to movie detail and load data correctly', () => {
    cy.fixture('movie-detail-mock.json').then((data) => {
      cy.intercept(
        {
          method: 'GET',
          url: /\/3\/movie\/857/,
        },
        { body: data },
      ).as('getMovieDetail');
    });

    // Visit the homepage and navigate to movie detail
    cy.visit('/');
    cy.wait('@getMovies');

    cy.contains('Saving Private Ryan').click();

    cy.wait('@getMovieDetail');

    cy.get('.movie-detail__title').should('contain', 'Saving Private Ryan');
    cy.get('.movie-detail__overview').should(
      'contain',
      'As U.S. troops storm the beaches of Normandy',
    );
    cy.get('.movie-detail__genres').should('contain', 'Drama');
  });

  it('should handle empty movie results gracefully', () => {
    cy.fixture('person-mock.json').then((data) => {
      cy.intercept(
        {
          method: 'GET',
          url: /\/3\/search\/person\?.*query=Tom%20Hanks.*/,
        },
        data,
      ).as('getPersonTomHanks');
    });

    cy.intercept(
      {
        method: 'GET',
        url: /\/3\/discover\/movie\?.*with_cast=.*/,
      },
      { body: { results: [], total_results: 0 } },
    ).as('getEmptyMovies');

    // Visit the homepage
    cy.visit('/');
    cy.wait('@getEmptyMovies');

    // Assert that a no-results message is displayed
    cy.contains('No data to show').should('exist');
  });

  it('should navigate back to overview from detail page', () => {
    // Mock the API call for movie details
    cy.fixture('movie-detail-mock.json').then((data) => {
      cy.intercept(
        {
          method: 'GET',
          url: /\/3\/movie\/857/,
        },
        { body: data },
      ).as('getMovieDetail');
    });

    // Visit the homepage and navigate to movie detail
    cy.visit('/');
    cy.wait('@getMovies');

    cy.contains('Saving Private Ryan').click();
    cy.wait('@getMovieDetail');

    // Click on the back button
    cy.get('.back-to-overview').click();

    // Assert that it navigates back to the overview page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('.movie-grid').should('exist');
  });
});
