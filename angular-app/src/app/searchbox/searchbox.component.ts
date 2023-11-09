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
  searchType: string = 'Artistas';
  
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

  toggleSearchType() {
    this.searchType = this.searchType === 'Artistas' ? 'Canciones' : 'Artistas';
  }


  async searchMusic() {

    this.router.navigate(['/loading-spinner'])
    const searchStr = this.searchForm.get('searchStr')?.value;    

    if(this.searchType == 'Artistas')
    {
      this.router.navigate(['/search-result-artist'])
      this.searchResult = await this.spotifyService.asyncCallSearchItem(searchStr, "artist");
      
    }
    else if(this.searchType == 'Canciones')
    {
      this.router.navigate(['/search-result-song'])
      this.searchResult = await this.spotifyService.asyncCallSearchItem(searchStr, "track");
      
    }

    this.data.changeResult(this.searchResult);
    
  }
}
