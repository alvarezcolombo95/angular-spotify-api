import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotifySearchItemService } from '../services/spotify-search-item.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/UserService/user.service';
import { PlaylistService } from '../services/PlaylistService/playlist.service';


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
  audioPlayer: any = null;

  playlistSuccess: boolean = false;
  loginFailure: boolean = false;

  constructor(private spotifyService: SpotifySearchItemService, private loginservice: LoginService, private userservice: UserService, private playlistService: PlaylistService) {}

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
      this.audioPlayer = document.getElementById('audio-player-main');
      this.audioPlayer.load();

      this.playlistSuccess = false;
      this.loginFailure = false;

      
  }

  async getId() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.id);
      return data.id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getTokenAsync(){
    try {
      let token = await this.loginservice.getToken()
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async createPlaylist() {
    let token = null;
    token = this.loginservice.getToken()
    let userId = await this.getId();
    if (token) {
      let playlistId = await this.playlistService.createPlaylist(token, userId, `If you like...` + this.trackResult.name)
      console.log(playlistId)

      this.playlistSuccess = true;
      for (let i = 0; i < this.recomTracks.length; i++)
      {
        if(token != null)
        {
          await this.playlistService.addTrack(playlistId, token, this.recomTracks[i].uri);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    else
    {
      this.loginFailure = true;
    }
  }







}
