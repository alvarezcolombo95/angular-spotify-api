import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchItemService {
    public credentials = {

      clientId: '90442bb7464449dc8ce9b236836efe91',
      clientSecret: '51e35e9be15f49bc9a37ed1b313392db',
      accessToken: ''
    }

    public GetToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(this.credentials.clientId + ':' + this.credentials.clientSecret)
          },
          body: 'grant_type=client_credentials'
        }
      )
      const data = await result.json();
      return data.access_token;
    };
    
    async asyncCall() {
      console.log('Calling');
      try {
        var tk = await this.GetToken();
        console.log('respuesta JSON:');
        console.log(tk);
      } catch (error) {
        console.log(error);
      };
    }

    constructor() { }

    //////////////////////////////////////////////

    async asyncCallSearchItem(input: string, type: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getSearchItem(input, type);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getSearchItem(input: string, type: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/search?q='+input+'&type='+ type);
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Search Item');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }

    ////////////////////////////////////////////////////

    async asyncCallGetArtist(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getArtist(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getArtist(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/artists/' + input);
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Get Artist');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }

    ///////////////////////////////////////////////////////////

    async asyncCallGetTopTracks(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getTopTracks(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getTopTracks(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/artists/' + input + '/top-tracks?market=AR');
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Get Top Tracks');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }

    ///////////////////////////////////////////////////////////
    
    async asyncCallGetRelatedArtists(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getRelatedArtists(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getRelatedArtists(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/artists/' + input + '/related-artists');
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Get Related Artists');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }


    ////////////////////////////////////////////////////////

    async asyncCallGetTrack(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getTrack(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getTrack(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/tracks/' + input);
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Get Track');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }

    ///////////////////////////////////////////////////////////

    async asyncCallGetRecom(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getRecom(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getRecom(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/recommendations?seed_tracks=' + input);
        xhr.setRequestHeader('Authorization', `Bearer ${await this.GetToken()}`);
    
        xhr.onload = function () { 
                if (xhr.status == 200) {
                    console.log('respuesta del servidor o API Pedido Get Recom');
                    let data = JSON.parse(this.response);
                    resolve(data);
                } else {
                    reject(new Error('error en la conexion'));
                }
            };
    
            xhr.send(data); 
    
      });
    }

}

