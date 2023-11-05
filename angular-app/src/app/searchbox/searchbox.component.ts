import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { SearchCommService } from '../services/search-comm.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent implements OnInit {
  
  searchForm: FormGroup;
  searchResult: any = null;
  
  constructor(private spotifyService: SpotifySearchItemService, private router: Router, private data: SearchCommService) {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });

    this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult)

  }


  async searchMusic() {
    const searchStr = this.searchForm.get('searchStr')?.value;
    this.router.navigate(['/search-result-artist'])

    this.searchResult = await this.spotifyService.asyncCallSearchItem(searchStr);
    this.data.changeResult(this.searchResult);
    /*
    console.log("log desde searchbox component:")
    console.log(this.searchResult);*/

    
  }
}
