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

  artistName: string = ''
  followers: string = ''
  genres: Array<string> = []

  constructor(private data: SearchCommService) {}

  ngOnInit(): void {

    //this.subscription = this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult);

    this.subscription = this.data.currentResult.pipe(
      filter(searchResult => searchResult !== null),
      tap(searchResult => {
        //guardar nombre de artista
        this.artistName = searchResult.artists.items[0].name
        //guardar cantidad de followers
        this.followers = searchResult.artists.items[0].followers.total
        //guardar generos en array
        for (let i = 0; i < searchResult.artists.items[0].genres.length; i++) {
          
          this.genres.push(searchResult.artists.items[0].genres[i]);
          console.log("item lista:" + this.genres[i])
        } 
      })
    ).subscribe(searchResult => this.searchResult = searchResult);
    /*this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult)*/
  }

  funcionTest(){
    console.log("funcionTest()" + this.artistName)
  }




  
}
