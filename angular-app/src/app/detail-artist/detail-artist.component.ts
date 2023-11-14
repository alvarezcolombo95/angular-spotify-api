import { Component, Input, SimpleChanges} from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';

@Component({
 selector: 'app-detail-artist',
 templateUrl: './detail-artist.component.html',
 styleUrls: ['./detail-artist.component.css']
})
export class DetailArtistComponent{


    @Input() id: string = '';
    artistResult: any = null;
    topTracksResult: any = null;
    tracks!: any[];

    relatedArtistsResult: any = null;
    related!: any[];

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
        this.artistResult = await this.spotifyService.asyncCallGetArtist(this.id);
        this.topTracksResult = await this.spotifyService.asyncCallGetTopTracks(this.id)
        this.tracks = this.topTracksResult.tracks;

        this.relatedArtistsResult = await this.spotifyService.asyncCallGetRelatedArtists(this.id)
        this.related = this.relatedArtistsResult.artists;
    }

    switchId(id: string)
    {
        this.id = id;
        this.callService();
    }

    
}