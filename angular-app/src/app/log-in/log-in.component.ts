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
  async ngOnInit(): Promise<void> {
    await this.loginService.handleAuthCallback();
    this.sesionIniciada();
    console.log(localStorage.getItem('token'));
  }

  sesionIniciada() {
    const token = this.loginService.token;
    if (!!token) {
      // console.log(tkn);
      console.log('Sesion iniciada');
      let tkn = this.loginService.token;
      localStorage.setItem('token', tkn);//Actualizo el token
      //console.log(tkn);
      return 1;
    }
    else {
      console.log('No hay nuevo token')
      return 0;
    }
  }



   async whenCLick() {
    const url = await this.loginService.getUrlLogin();
    window.location.href = url;
  }

  logout() {
    this.loginService.logOut();
  }

}