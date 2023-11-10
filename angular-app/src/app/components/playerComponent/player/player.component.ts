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


  getToken(){
    return localStorage.getItem('token');
  }

  previous(){
    let token = this.getToken();
    if(!!token){
      this.playerservise.previousSong(token);
    }
  }
  playpause(){
    let token = this.getToken();
    if(!!token){
    this.playerservise.playPause(token);
    }
  }
    

  next(){
    let token = this.getToken();
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
}
