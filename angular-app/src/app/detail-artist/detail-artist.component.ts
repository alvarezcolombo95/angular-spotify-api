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

    constructor(private spotifyService: SpotifySearchItemService) {
        
    }

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
        console.log("funcion test")
        console.log(this.artistResult)
    }
}