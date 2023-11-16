import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/PlayerService/player.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit{

constructor(private  playerservise: PlayerService, private loginservice: LoginService){}


  ngOnInit(): void {
    
  }
  
  public sesion = this.loginservice.checkLog();


  getToken(){//Llevarlo al loginservice?
    return localStorage.getItem('token');
  }

  previous(){
    let token = this.loginservice.getToken();
    if(!!token){
      this.playerservise.previousSong(token);
    }
  }
   playpause(){
    let token =  this.loginservice.getToken();
    if(!!token){
    this.playerservise.playPause(token);
    }
  }
    

  next(){
    let token = this.loginservice.getToken();;
    if(!!token){
      this.playerservise.nextSong(token);
    }

}
  sesionIniciada() {
    if (!!this.loginservice.checkLog()) {
      return 1;
    }
    else {
      //alert('Debe iniciar sesion primero');
      return 0;
    }
  }



  // async getTrack(){
  //   let token =this.loginservice.getToken()
  //   let track;
  //   if(!!token)
  //   track= await this.playerservise.getCurrentTrack(token);
  //   console.log(track)
  //   return track;
  // }
}
