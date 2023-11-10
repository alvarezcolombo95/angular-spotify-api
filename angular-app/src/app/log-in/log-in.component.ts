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
    this.sesionIniciada();
    console.log(localStorage.getItem('token'))
  }

  sesionIniciada() {
    const token = this.loginService.token;
    if (!!token) {
      // console.log(tkn);
      console.log('Sesion iniciada');
      let tkn = this.loginService.token;
      localStorage.setItem('token', tkn);//Actualizo el token
      console.log(tkn);
      return 1;
    }
    else {
      console.log('No hay nuevo token')
      return 0;
    }
  }



  whenCLick() {
    window.location.href = this.loginService.getUrlLogin();
  }
  logout() {
    this.loginService.logOut();
  }

}