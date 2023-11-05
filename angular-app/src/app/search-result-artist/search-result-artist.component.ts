import { Component, Input, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-result-artist',
  templateUrl: './search-result-artist.component.html',
  styleUrls: ['./search-result-artist.component.css']
})
export class SearchResultArtistComponent implements OnInit {

  searchResult: any = null;
  private subscription?: Subscription;

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

  funcionTest(){
    console.log("funcionTest()")
  }




  
}
