import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent implements OnInit {
  
  searchForm: FormGroup;
  
  constructor(private spotifyService: SpotifySearchItemService, private router: Router) {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });
  }


  async searchMusic() {
    const searchStr = this.searchForm.get('searchStr')?.value;
    this.router.navigate(['/search-result-artist'])

    let res = await this.spotifyService.asyncCallSearchItem(searchStr);

    console.log("log desde searchbox component:")
    console.log(res);

    
  }
}
