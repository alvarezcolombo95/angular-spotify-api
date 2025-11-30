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

  async transferPlaybackState(token:string,devid:string){
    await fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      // body: '{\n    "device_ids": [\n        "74ASZWbe4lXaubB36ztrGX"\n    ]\n}',
      body: JSON.stringify({
        'device_ids': [
          `${devid}`
        ],
        'play': true
      })
    });
  }

  async playPause(token: string) {
    const devid = await this.deviceservice.obtenerDispositivos(token);  //Obtengo el dispositivo disponible
    try{
      if(!! await this. getState(token)){
      console.log('Esta Reproduciendo')
      await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ device_id: [devid] }),
      });
    }
    else{
      console.log('Esta Pausado')
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
    catch(error){
      this.transferPlaybackState(token, devid);   //Si no esta activo lo hago activo y reproduzco
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
      return data.is_playing; //True or false si esta reproduciendo o no
    
  }


//   async getCurrentTrack(token:string){
//     const data = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// });
//   const resp = await data.json();
//   return resp.item;

//   }

}
