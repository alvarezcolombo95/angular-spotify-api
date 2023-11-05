import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }
  getUrlLogin(){
    const authEndPoint=`${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl =`redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scopes=${SpotifyConfiguration.scope.join('%20')}&`;
    const responseType= `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  
}
