import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  searchOptions = ['Artistas', 'Canciones', 'Álbumes'];
  
  constructor(private spotifyService: SpotifySearchItemService, private router: Router, private data: SearchCommService) {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('', Validators.pattern(/^[a-zA-Z0-9 ]*$/))
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('', Validators.pattern(/^[a-zA-Z0-9 ]*$/))
    });

    this.data.currentResult.subscribe(searchResult => this.searchResult = searchResult)

  }

  toggleSearchType() {
    const currentIndex = this.searchOptions.indexOf(this.searchType);
    this.searchType = this.searchOptions[(currentIndex + 1) % this.searchOptions.length];
  }


  async searchMusic() {

    if(this.checkValiditySearch())
    {
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
      else{
        this.router.navigate(['/search-result-album']);
        this.searchResult = await this.spotifyService.asyncCallSearchItem(searchStr, "album");
      }
  
      this.data.changeResult(this.searchResult);
    }    
  }

  checkValiditySearch() {
    let validSearch = true;
    if (this.searchForm.controls['searchStr'].invalid) {
      alert('Por favor ingrese números o letras únicamente');
      validSearch = false;
    }

    return validSearch;
   }
   
}
