import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DevicesService } from '../devices.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements OnInit {
  ngOnInit(): void {

  }

  constructor(private deviceservice: DevicesService) { }

  async previousSong(token: string) {
    await fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  async playPause(token: string) {
    const devid = await this.deviceservice.obtenerDispositivos(token);
    if(!! await this. getState(token)){
      console.log('Esta pausado')
      await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ device_id: [devid] }),
      });
    }
    else{
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ device_id: [devid] }),
      });
      }
    }
    
  




  async nextSong(token: string) {
    await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getState(token: string) {
     const response = await fetch('https://api.spotify.com/v1/me/player',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      let data  = await response.json()
      console.log(data.is_playing)
      return data.is_playing;
    
  }



}
