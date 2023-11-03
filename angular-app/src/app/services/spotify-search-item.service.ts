//NO TENGO IDEA DE LO QUE ESTOY HACIENDO, IGNORAR POR AHORA

/*import { Injectable, EventEmitter } from '@angular/core';*/
/*import {HttpClient, HttpHeaders} from '@angular/common/http';*/
/*import {map} from 'rxjs/operators';*/
/*
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

    constructor(private searchInputChange: EventEmitter<string>) { }


    
}

/*
    public fetchedToken = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': 'your-client-id',
          'client_secret': 'your-client-secret'
        })
      });
    */
   
      /*
  constructor() { }*/
