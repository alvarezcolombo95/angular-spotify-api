import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }
  getUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scope.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  getToken() {
    if (!window.location.hash)
      return '';
    else{
      const params = window.location.hash.substring(1).split('&');   //Separo el token y sus atributos
      let token = params[0].split('=')[1];
      return  token// Retorno el token especificamente
    }
  }

  async  obtenerDispositivos(token:string) {
    const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.devices;
   }
   async  play(token:string,deviceId: string) {
    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ device_ids: [deviceId] }),
    });
   }
   
   

   async  reproducir(token: string) {
    const devices = await this.obtenerDispositivos(token);
    if (devices.length > 0) {
      const deviceId = devices[0].id;
      await this.play(token,deviceId);
    } else {
      console.log('No hay dispositivos disponibles');
    }
   }
   
}
