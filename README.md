# Movielist

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

This application utilizes the TMDB Discover Movie endpoint with the with_cast and with_crew parameters to fetch movies featuring Tom Hanks and directed by Steven Spielberg.

API Limitation

The TMDB API does not allow specifying roles (e.g., actor or director) in the with_cast or with_crew parameters. As a result:

    •	The results may include movies where Tom Hanks or Steven Spielberg participated in a different capacity (e.g., producer, cameo).
    •	To ensure accuracy, further filtering would require fetching movie details (using the Credits endpoint) for each result. However, this would drastically increase the number of API calls, making it unfeasible.

Trade-offs

This approach balances efficiency and scalability, relying on the assumption that the API data is generally accurate for filtering by cast and crew. Some inaccuracies may still occur depending on the data provided by the API.

Future Considerations

    •	Introduce additional filtering logic by querying movie credits where feasible.
    •	Leverage caching or server-side aggregation to optimize API calls for advanced use cases.

## Setting Up the TMDB API Key

1. Register at [TMDB](https://www.themoviedb.org/documentation/api) and get an API key.
2. Copy `src/environments/environment.sample.ts` to:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

3. Replace `your_api_key_here` with your TMDB API key.

**Important:** Never expose your API key in the repository or public files.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running unit tests with coverage

Run the following command to generate a code coverage report:

```bash
npm run test-coverage
```

The coverage report will be available in the coverage directory. Open coverage/movielist/index.html in your browser to view the detailed report.

    •	Aim for meaningful tests that provide good coverage across components, services, and critical logic.
    •	Focus on edge cases and potential failure points in your application.
    •	Regularly monitor and improve the coverage to ensure application reliability and maintainability.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
