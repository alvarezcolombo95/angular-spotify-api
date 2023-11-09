import { Injectable, OnInit } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { DevicesService } from './devices.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService implements OnInit{
  private isloged: boolean = false;

  constructor(private deviceservice: DevicesService) { }
  ngOnInit(): void {
  }

  
  getUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scope.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }


  getTokenFromUrl() {
    if (!window.location.hash)
    {
    console.log('No existe token en la url');
    return '';
    }
      
    else{
      console.log('se encontro un token')
      const params = window.location.hash.substring(1).split('&');   //Separo el token y sus atributos
      let token = params[0].split('=')[1];
      this.isloged=true;
      return  token// Retorno el token especificamente
    }
  }
  public token = this.getTokenFromUrl();
  
  logOut(){
    this.isloged=false;
  }

  checkLog(){
    return this.isloged;
  }
  
   
}
