import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DevicesService } from '../devices.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(private deviceservice: DevicesService) { }

  async previousSong(token: string){
    await fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });}
  async playPause(token:string){
    const devid= await this.deviceservice.obtenerDispositivos(token);
    await fetch('https://api.spotify.com/v1/me/player/play', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({ device_id: [devid] }),
});
  }
  async nextSong(token: string){
    await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  
  // async  play(token:string,deviceId: string) {
  //   await fetch('https://api.spotify.com/v1/me/player/play', {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ device_ids: [deviceId] }),
  //   });
  //  }
   
   

  //  async  reproducir(token: string) {
  //   const devices = await this.deviceservice.obtenerDispositivos(token);
  //   if (devices.length > 0) {
  //     const deviceId = devices[0].id;
  //     await this.play(token,deviceId);
  //   } else {
  //     console.log('No hay dispositivos disponibles');
  //   }
  //  }

  
}
