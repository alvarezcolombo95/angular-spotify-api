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
    if(!!token)
    this.playerservise.playPause(token);
    // const token = this.loginservice.token;
    // if (!!token) {
    //   // console.log(tkn);
    //   console.log('Sesion iniciada')
    //   this.playerservise.playPause(token)
    //   return 1;
    // }
    // else {
    //   console.log('Debe iniciar sesion')
    //   return 0;
    // }
  }
    

  next(){
    let token = this.getToken();
    if(!!token){
      this.playerservise.nextSong(token);
    }
  // }
  // tokenVerify() {
  //   if (!this.sesionIniciada()) {
  //     let tk = this.loginservice.getTokenFromUrl(); // Si no esta inicciada la sesion, lo hago
  //     localStorage.setItem('token', tk) //guardo el token
  //     console.log(tk)
  //   }
  // }
  
  // sesionIniciada() {
  //   let tk = localStorage.getItem('token');
  //   if (!!tk) {
  //     // console.log(tkn);
  //     console.log('Sesion iniciada')
  //     //this.loginservice.reproducir(tk);
  //     return 1;
  //   }
  //   else {
  //     console.log('Debe iniciar sesion')
  //     return 0;
  //   }
  // }

  
  
 


}}
