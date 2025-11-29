import { Component, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RatingService } from '../services/rating.service';
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

  ratingsCache: Record<string, number> = {};

  constructor(
    private data: SearchCommService,
    private ratingService: RatingService,
    private loginService: LoginService
  ) {}

  ngOnInit() {

    this.subscription = this.data.currentResult.pipe(
      filter(res => res !== null),
      tap(res => {
        // FIRST update searchResult
        this.searchResult = res;

        // THEN load ratings safely
        this.loadRatingsForSearch(res);
      })
    ).subscribe();

    // Listen for rating updates
    this.ratingService.ratingChanged.subscribe(() => {
      if (this.searchResult)
        this.loadRatingsForSearch(this.searchResult);
    });
  }

  /** Load ratings for all albums in the search results */
  loadRatingsForSearch(res: any) {
    if (!res?.albums?.items) return;

    for (let album of res.albums.items) {
      this.ratingService.getRating(album.id).subscribe(r => {
        this.ratingsCache[album.id] = r?.rating ?? 0;
      });
    }
  }

  getRating(albumId: string): number {
    return this.ratingsCache[albumId] ?? 0;
  }

  rate(albumId: string, value: number, name: string, artistsArr: Array<{ name: string }>) {
    const artists = artistsArr.map(a => a.name).join(', ');

    this.ratingService.setRating(albumId, value, name, artists).subscribe(() => {
      this.ratingsCache[albumId] = value;
    });
  }

  viewDetails(id: string) {
    this.idDetails = id;
    this.displayDetails = true;
  }

  getStarsArray(n: number): number[] {
    return Array.from({ length: n }, (_, i = 0) => i + 1);
  }

  isLoged() {
    return this.loginService.checkLog() ? 1 : 0;
  }
}