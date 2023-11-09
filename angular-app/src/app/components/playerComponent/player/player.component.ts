import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/PlayerService/player.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit{

constructor(private  playerservise: PlayerService){}


  ngOnInit(): void {
  }
  
  
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
    let tk = localStorage.getItem('token');
    if (!!tk) {
      console.log('Sesion iniciada')
      return 1;
    }
    else {
      console.log('Debe iniciar sesion')
      //alert('Debe iniciar sesion primero');
      return 0;
    }
  }
}
