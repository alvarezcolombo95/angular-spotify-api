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

    async asyncCallSearchItem(input: string) {
      console.log('Pidiendo');
      try {
        const res = await this.getSearchItem(input);
        console.log('respuesta JSON:');
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      };
    }
    
    getSearchItem(input: string) {
      return new Promise(async (resolve, reject) => {
        const data =null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/search?q='+input+'&type='+'artist');
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
    
}

