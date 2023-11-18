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

  constructor(private loginservice: LoginService, private userservice: UserService, private playlistService: PlaylistService) {
  }

  async ngOnInit() {
    this.nombreUsuario = await this.getName();
    this.profilePicUrl = await this.getProfilePic();
    this.followers = await this.getFollowers();
    this.recentItems = await this.getRecentItems('tracks', 'medium_term');
    this.recentArtists = await this.getRecentItems('artists', 'medium_term');
  }


  getUris() {//Devuelve un string de varias canciones
    let uriString: string = '';
    if (this.recentItems && this.recentItems.length > 0) {
      uriString = this.recentItems.map(track => track.uri).join(',');
      this.recentItems.forEach(track => {
        uriString += track.uri.join(',');
      });
    }
    console.log(uriString)
    return uriString;

  }



  async createPlaylist() {
    let token = this.loginservice.getToken()
    let userId = await this.getId();
    let fechaActual = new Date();
    let ano = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; 
    let dia = fechaActual.getDate();
    if (token != null) {
      let playlistId = await this.playlistService.createPlaylist(token, userId, `${this.showType}-${this.termType}-${ano}-${mes}-${dia}`)
      console.log(playlistId)
      for (let i=0;i<this.recentItems.length;i++){
        if (token != null) {// If para que la funcion tome el token//PROBAR INSISTIR SI TIRA ERROR?
        await this.playlistService.addTrack(playlistId, token, this.recentItems[i].uri) //Agrego canciones 1 por 1 //Algunas agrega otras no!! eror 500/502
        await new Promise(resolve=> setTimeout(resolve,100));
        
      }
        
         }
      }
    }
  


  async toggleTermType() {
    this.term = (this.term === 'short_term' ? 'medium_term' :
      this.term === 'medium_term' ? 'long_term' : 'short_term');
    this.termType = this.termType === 'Ultimos 6 meses' ? 'All time' :
      this.termType === 'All time' ? 'Ultimo mes' : 'Ultimos 6 meses';
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
      //console.log(data.items);
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
      //console.log(data.followers.total);
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

