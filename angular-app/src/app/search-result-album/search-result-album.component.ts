import { Component, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RatingService, AlbumRating } from '../services/rating.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-search-result-album',
  templateUrl: './search-result-album.component.html',
  styleUrls: ['./search-result-album.component.css']
})
export class SearchResultAlbumComponent implements OnInit {

  searchResult: any = null;
  private subscription?: Subscription;

  displayDetails: boolean = false;
  idDetails: string = '';

  ratingsCache: Record<string, number> = {};  // NEW: for quick star display

  constructor(
    private data: SearchCommService,
    private ratingService: RatingService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
  // when new search results arrive
  this.subscription = this.data.currentResult.pipe(
    filter(res => res !== null),
    tap(res => this.loadRatingsForSearch(res))
  ).subscribe(res => this.searchResult = res);

  // when rating changes anywhere
  this.ratingService.ratingChanged.subscribe(() => {
    if (this.searchResult)
      this.loadRatingsForSearch(this.searchResult);
  });
}

// Load rating for each album on page
loadRatingsForSearch(res: any) {
  if (this.searchResult?.albums?.items) {
  for (let album of this.searchResult.albums.items) {
    this.ratingService.getRating(album.id).subscribe(r => {
      this.ratingsCache[album.id] = r?.rating ?? 0;
    });
  }
}
}

  /** Get stored rating for UI */
  getRating(albumId: string): number {
    return this.ratingsCache[albumId] ?? 0;
  }

  /** When clicking a star */
  rate(albumId: string, value: number, name: string, artistsArr: Array<{ name: string }>) {
    const artists = artistsArr.map(a => a.name).join(', ');

    this.ratingService.setRating(albumId, value, name, artists).subscribe(() => {
      this.ratingsCache[albumId] = value;  // Update UI
    });
  }

  viewDetails(id: string) {
    this.idDetails = id;
    this.displayDetails = true;
  }

  /** For *ngFor */
  getStarsArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  isLoged() {
  if (this.loginService.checkLog())
    return 1;
  else
    return 0;
  }
}