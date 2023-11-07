import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  async previousSong(token: string){
    await fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });}
  async playPause(token: string){
    await fetch('https://api.spotify.com/v1/me/player/play', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
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

  
}
