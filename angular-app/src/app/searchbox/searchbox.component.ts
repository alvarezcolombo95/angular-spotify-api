import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent implements OnInit {
  
  searchForm: FormGroup;
  
  constructor(private spotifyService: SpotifySearchItemService) {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchStr: new FormControl('')
    });
  }


  searchMusic() {
    const searchStr = this.searchForm.get('searchStr')?.value;
    //console.log(searchStr);
    this.spotifyService.asyncCallSearchItem(searchStr);


  }
}
