import { Component, NgModule, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/PlaylistService/playlist.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {


  nombreUsuario!: string;
  profilePicUrl!: string;
  followers!: string;
  recentItems = [] as any[];
  recentArtists = [];
  showType: string = 'Canciones'
  termType: string = 'Ultimos 6 meses'
  term: string = 'medium_term';
  type: string = 'tracks';

  constructor(private loginservice: LoginService, private userservice: UserService, private playlistService:PlaylistService) {
  }

  async ngOnInit() {
    this.nombreUsuario = await this.getName();
    this.profilePicUrl = await this.getProfilePic();
    this.followers = await this.getFollowers();
    this.recentItems = await this.getRecentItems('tracks', 'medium_term');
    this.recentArtists = await this.getRecentItems('artists', 'medium_term');
  }

    // this.recentItems = await this.getRecentItems('tracks', this.term);

  getUris(){
    let uriString:string = '';
    if(this.recentItems && this.recentItems.length>0){
      uriString = this.recentItems.map(track=>track.uri).join(',');
    //   this.recentItems.forEach(track => {
    //       uriString += track.uri.join(',');
    // });
    }
    console.log(uriString)
    return uriString;
    
  }
   async createPlaylist(){
    let token = this.loginservice.getToken()
    let userId = await this.getId();
    if(token!=null)
    {
      //let playlistId = await this.playlistService.createPlaylist(token,userId,`${this.showType}+${this.termType}`)
      let uriString = this.getUris();
      console.log(uriString.split(',').map(uri => `"${uri}"`))
      //this.playlistService.addTracks(playlistId,token,uriString.split(',').map(uri => `"${uri}"`));
      //return playlistId;
    }
    }


  async toggleTermType() {
    this.term = (this.term === 'short_term' ? 'medium_term' : 
                    this.term === 'medium_term'? 'long_term':'short_term');
    this.termType = this.termType === 'Ultimos 6 meses' ? 'All time' : 
                    this.termType === 'All time'?'Ultimo mes':'Ultimos 6 meses';
    this.recentItems = await this.getRecentItems('tracks', this.term);
    this.recentArtists = await this.getRecentItems('artists', this.term);
  }

  async toggleShowType() {
    this.showType = (this.showType === 'Canciones' ? 'Artistas' : 'Canciones');
    //this.type = (this.type === 'tracks'? 'artists': 'tracks');
    this.recentItems = await this.getRecentItems('tracks', this.term);
    this.recentArtists = await this.getRecentItems('artists', this.term);
  }

  async getRecentItems(type: string, term: string) {
    try {
      const response = await this.userservice.recentItems(type, term);
      const data = await response.json();
      console.log(data.items);
      return data.items;
    } catch (error) {
      console.error('Error:', error);
    }
  }


  async getName() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data);
      console.log(data.display_name);
      return data.display_name;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getId(){
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.id);
      return data.id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getProfilePic() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.images[1].url);
      return data.images[1].url;
    }
    catch (error) {
      console.log(error)
    }
  }
  async getFollowers() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.followers.total);
      return data.followers.total;
    }
    catch (error) {
      console.log(error)
    }
  }


  isLoged() {
    if (this.loginservice.checkLog())
      return 1;
    else
      return 0;
  }
}

