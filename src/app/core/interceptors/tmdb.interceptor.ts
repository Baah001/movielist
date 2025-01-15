import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Interceptor to modify TMDB API requests.
 * This interceptor rewrites requests targeting `/api/` to point to the TMDB API base URL
 * and appends the API key to the request query parameters.
 */
export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.tmdbBaseUrl;
  const apiKey = environment.tmdbApiKey;

  // Check if the request URL starts with `/api/` to identify TMDB API requests.
  if (req.url.startsWith('/api/')) {
    const updatedRequest = req.clone({
      // Update the request URL to point to the TMDB API base URL.
      url: `${baseUrl}${req.url.replace('/api/', '')}`,
      // Append the API key as a query parameter.
      setParams: { api_key: apiKey },
    });

    // Forward the updated request to the next handler.
    return next(updatedRequest);
  }

  // For non-TMDB API requests, forward the original request unchanged.
  return next(req);
};
