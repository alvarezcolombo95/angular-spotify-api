import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private loginservice: LoginService) { }

  async getUser(){
    return await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      }
    });
  }

  async recentItems(type:string,term:string){
    return await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${term}`, {
  headers: {
    'Authorization': `Bearer ${this.loginservice.getToken()}`
  }
});
   }

}
