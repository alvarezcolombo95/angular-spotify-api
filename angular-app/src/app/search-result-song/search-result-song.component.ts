import { Component } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-result-song',
  templateUrl: './search-result-song.component.html',
  styleUrls: ['./search-result-song.component.css']
})
export class SearchResultSongComponent {

  searchResult: any = null;
  private subscription?: Subscription;

  displayDetails: boolean = false;
  idDetails: string = ''

  constructor(private data: SearchCommService) {}

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

}
