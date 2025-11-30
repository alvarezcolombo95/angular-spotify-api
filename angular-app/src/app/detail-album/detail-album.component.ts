import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';
import { RatingService } from '../services/rating.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.css']
})
export class DetailAlbumComponent {

  @Input() id: string = '';
  albumResult: any = null;
  currentRating: number = 0;

  constructor(
    private spotifyService: SpotifySearchItemService,
    private ratingService: RatingService,
    private loginService: LoginService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
        this.loadRating();
        this.callService();
    }

    this.ratingService.ratingChanged.subscribe(() => this.loadRating());
    }

  //Cargar rating del backend
  loadRating() {
    if (!this.id) return;
    this.ratingService.getRating(this.id).subscribe(r => {
      this.currentRating = r?.rating ?? 0;
    });
  }

  //Get info de album de Spotify
  async callService() {
    this.albumResult = await this.spotifyService.asyncCallGetAlbum(this.id);
  }

  //Rate album
  rate(albumId: string, value: number, name: string, artistsArr: Array<{ name: string }>) {
    const artists = artistsArr.map(a => a.name).join(', ');

    this.ratingService.setRating(albumId, value, name, artists).subscribe(() => {
      this.currentRating = value;  // actualizar UI
    });
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  isLoged() {
  if (this.loginService.checkLog())
    return 1;
  else
    return 0;
  }
}