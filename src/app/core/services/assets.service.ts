import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Service responsible for managing asset-related logic, such as constructing
 * image URLs for movie details and placeholder images.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetService {
  /**
   * Returns the complete URL for an image asset.
   * If the image path is null, it provides the URL for a placeholder image.
   *
   * @param path - The relative path to the image.
   * @returns The complete URL for the image or placeholder.
   */
  getImageUrl(path: string | null): string {
    const baseHref = environment.assetsBaseUrl;
    if (!path) {
      return `${baseHref}assets/placeholder_image_movie_detail.jpg`;
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
