import { Component, Input, SimpleChanges} from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';
import { RatingService } from '../services/rating.service';

@Component({
 selector: 'app-detail-album',
 templateUrl: './detail-album.component.html',
 styleUrls: ['./detail-album.component.css']
})
export class DetailAlbumComponent{


    @Input() id: string = '';
    albumResult: any = null;
    currentRating: number = 0;    

    constructor(private spotifyService: SpotifySearchItemService, private ratingService: RatingService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['id']) {
            this.currentRating = this.ratingService.getRating(this.id) ?? 0; //default to zero
            this.doSomething(changes['id'].currentValue);
        }
    }
 
    doSomething(value: string) {
        this.callService()
    }

    async callService()
    {
        this.albumResult = await this.spotifyService.asyncCallGetAlbum(this.id);
    }

    switchId(id: string)
    {
        this.id = id;
          this.currentRating = this.ratingService.getRating(id) ?? 0;  //default to zero
        this.callService();
    }

    rate(albumId: string, value: number, albumName: string, albumArtists: Array<{ name: string }>) {
  this.ratingService.setRating(
    albumId,
    value,
    albumName,
    albumArtists.map(a => a.name).join(', ')
  );
}

    formatDuration(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    
}