import { Component, Input, SimpleChanges} from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';

@Component({
 selector: 'app-detail-album',
 templateUrl: './detail-album.component.html',
 styleUrls: ['./detail-album.component.css']
})
export class DetailAlbumComponent{


    @Input() id: string = '';
    albumResult: any = null;
    

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
        this.albumResult = await this.spotifyService.asyncCallGetAlbum(this.id);
    }

    switchId(id: string)
    {
        this.id = id;
        this.callService();
    }

    formatDuration(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    
}