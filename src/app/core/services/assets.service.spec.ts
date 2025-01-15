import { TestBed } from '@angular/core/testing';
import { AssetService } from 'src/app/core/services/assets.service';
import { environment } from 'src/environments/environment';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetService],
    });
    service = TestBed.inject(AssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return placeholder URL when path is null', () => {
    const placeholderUrl = `${environment.assetsBaseUrl}assets/placeholder_image_movie_detail.jpg`;
    expect(service.getImageUrl(null)).toBe(placeholderUrl);
  });

  it('should return complete URL when valid path is provided', () => {
    const imagePath = '/sample_image.jpg';
    const expectedUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
    expect(service.getImageUrl(imagePath)).toBe(expectedUrl);
  });
});
