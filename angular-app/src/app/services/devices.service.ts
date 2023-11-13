import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }


  async  obtenerDispositivos(token:string) {
    const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const devices = data.devices;
    if (devices.length > 0) {
      const deviceId = devices[0].id;
      return deviceId;
    } else {
      console.log('No hay dispositivos disponibles');
    }
   }
}
