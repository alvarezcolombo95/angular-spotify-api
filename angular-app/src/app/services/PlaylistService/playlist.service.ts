import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor() {}


  async createPlaylist(token:string,userId:string,name:string){
    try {
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
    } catch (error) {
    console.log(error)
    }
  }


  async addTracks(playlistId:string,token:string,uris:string[])
  {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
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


  async addTrack(playlistId:string,token:string,uris:string){
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
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

  
  // async  addTrack(playlistId:string,token:string,uris:string) {
  //   let responseStatus = 0;
  //   while (responseStatus !== 201) {
  //    try {
  //      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  //        method: 'POST',
  //        headers: {
  //          'Authorization': `Bearer ${token}`,
  //          'Content-Type': 'application/json'
  //        },
  //        body: JSON.stringify({
  //          'uris': [
  //            `${uris}`
  //          ],
  //          'position': 0
  //        })
  //      });
  //      responseStatus = response.status;
  //      if (responseStatus === 429) {
  //        const retryAfter:any = response.headers.get('Retry-After');
  //        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
  //      } else if (responseStatus !== 201) {
  //        const responseText = await response.text();
  //        console.error(`Error: ${responseText}`);
  //      }
  //    } catch (error) { 
  //      console.error(`Error: ${error}`);
  //    }
  //   }
  //  }
   

}
