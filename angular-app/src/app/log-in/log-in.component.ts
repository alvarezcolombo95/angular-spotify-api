import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PlayerService } from '../services/PlayerService/player.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private loginService: LoginService, private playerservice: PlayerService) {

    
  }
  ngOnInit(): void {
    //this.tokenVerify();
    let token = this.loginService.token
    localStorage.setItem('token',token)
    console.log(localStorage.getItem('token'))
  }

  tokenVerify() {
    if (!this.sesionIniciada()) {
      let tkn = this.loginService.token; //this.loginService.getTokenFromUrl(); // Si no esta inicciada la sesion, lo hago
      localStorage.setItem('token', tkn) //guardo el token
      console.log(tkn)
    }
  }

  sesionIniciada() {
    const token = this.loginService.token;
    if (!!token) {
      // console.log(tkn);
      console.log('Sesion iniciada')
      this.playerservice.playPause(token);
      return 1;
    }
    else {
      console.log('Debe iniciar sesion')
      return 0;
    }
  }



  whenCLick() {
    window.location.href = this.loginService.getUrlLogin();
  }
  logout(){
      this.loginService.logOut();
  }

}