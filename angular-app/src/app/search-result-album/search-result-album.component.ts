import { Component, Input, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-search-result-album',
  templateUrl: './search-result-album.component.html',
  styleUrls: ['./search-result-album.component.css']
})
export class SearchResultAlbumComponent implements OnInit {

  searchResult: any = null;
  private subscription?: Subscription;

  displayDetails: boolean = false;
  idDetails: string = ''

  constructor(private data: SearchCommService, private ratingService: RatingService) {}

  ngOnInit(): void {

    //this.subscription = this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult);

    this.subscription = this.data.currentResult.pipe(
      filter(searchResult => searchResult !== null),
      tap(searchResult => {
        
      })
    ).subscribe(searchResult => this.searchResult = searchResult);
    /*this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult)*/
  }

  viewDetails(id: string)
  {
    this.idDetails = id;
    this.displayDetails = true;
  }

   /** Get stored rating for album */
  getRating(albumId: string): number {
    return this.ratingService.getRating(albumId) ?? 0;
  }

  /** Click to save rating */
  rate(albumId: string, value: number) {
    this.ratingService.setRating(albumId, value);
  }

  /** Helper for *ngFor stars */
  getStarsArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  





  
}
