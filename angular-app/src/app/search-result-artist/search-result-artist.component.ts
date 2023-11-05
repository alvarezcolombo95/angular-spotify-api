import { Component, Input, OnInit } from '@angular/core';
import { SearchCommService } from '../services/search-comm.service';

@Component({
  selector: 'app-search-result-artist',
  templateUrl: './search-result-artist.component.html',
  styleUrls: ['./search-result-artist.component.css']
})
export class SearchResultArtistComponent implements OnInit {

  searchResult: any = null;

  constructor(private data: SearchCommService) {}

  ngOnInit(): void {
    this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult)
  }

  funcionTest()
  {
    console.log(this.searchResult)
  }
}
