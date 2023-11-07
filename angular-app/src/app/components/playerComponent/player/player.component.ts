import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/PlayerService/player.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

constructor(private loginservice: LoginService,private  playerservise: PlayerService){}


  ngOnInit(): void {
    this.tokenVerify();
    
  }
  
  tokenVerify() {
    if (!this.sesionIniciada()) {
      let tk = this.loginservice.getToken(); // Si no esta inicciada la sesion, lo hago
      localStorage.setItem('token', tk) //guardo el token
      console.log(tk)
    }
  }
  
  sesionIniciada() {
    let tk = localStorage.getItem('token');
    if (!!tk) {
      // console.log(tkn);
      console.log('Sesion iniciada')
      this.loginservice.reproducir(tk);
      return 1;
    }
    else {
      console.log('Debe iniciar sesion')
      return 0;
    }
  }

  previous(){
    let tk = localStorage.getItem('token');
    if(!!tk){
      this.playerservise.previousSong(tk);
    }
  }
  playpause(){
    let tk = localStorage.getItem('token');
    if (!!tk) {
      // console.log(tkn);
      console.log('Sesion iniciada')
      this.loginservice.reproducir(tk);
      return 1;
    }
    else {
      console.log('Debe iniciar sesion')
      return 0;
    }
  }
    // let tk = localStorage.getItem('token');
    // if(!!tk){
    //   this.playerservise.playPause(tk);
    

  next(){
    let tk = localStorage.getItem('token');
    if(!!tk){
      this.playerservise.nextSong(tk);
    }
  }
  
 


}
