import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.tmdbBaseUrl;
  const apiKey = environment.tmdbApiKey;

  if (req.url.startsWith('/api/')) {
    const updatedRequest = req.clone({
      url: `${baseUrl}${req.url.replace('/api/', '')}`,
      setParams: { api_key: apiKey },
    });
    return next(updatedRequest);
  }

  return next(req);
};
