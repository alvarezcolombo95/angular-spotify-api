import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor() {}


  async createPlaylist(token:string,userId:string,name:string){
    const resp = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': `${name}`,
        'description': 'New playlist description',
        'public': false
      })
    });
    let data = await resp.json();
    return data.id;
  }


  async addTracks(userId:string,token:string,uris:string[])
  {
    await fetch(`https://api.spotify.com/v1/playlists/${userId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'uris': [
          `${uris}`
        ],
        'position': 0
      })
    });
  }
  async addTrack(userId:string,token:string,uris:string){
    let responseStatus = 0;
    while (responseStatus == 500 || responseStatus == 502) {
      try{
    const response = await fetch(`https://api.spotify.com/v1/playlists/${userId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'uris': [
          `${uris}`
        ],
        'position': 0
      })
    });
    responseStatus = response.status;
  }catch(error){console.log(error)}
  }
  }
}
