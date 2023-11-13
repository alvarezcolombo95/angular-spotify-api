import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent {

  @Input() id: string = '';
  trackResult: any = null;
  recom: any = null;
  recomTracks!: any[];

  constructor(private spotifyService: SpotifySearchItemService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
        this.doSomething(changes['id'].currentValue);
    }
  }

  doSomething(value: string) {
    this.callService()
  }

  async callService()
    {
        this.trackResult = await this.spotifyService.asyncCallGetTrack(this.id);
        this.recom = await this.spotifyService.asyncCallGetRecom(this.id)
        this.recomTracks = this.recom.tracks;
        
    }







}
