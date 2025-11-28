import { Component, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RatingService, AlbumRating } from '../services/rating.service';

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
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {

    this.subscription = this.data.currentResult.pipe(
      filter(searchResult => searchResult !== null),
      tap(async searchResult => {
        // Load ratings for all albums in search results
        for (let album of searchResult.albums.items) {
          this.ratingService.getRating(album.id).subscribe(r => {
            this.ratingsCache[album.id] = r?.rating ?? 0;
          });
        }
      })
    ).subscribe(searchResult => this.searchResult = searchResult);
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
}