import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private loginService: LoginService) {


  }
  ngOnInit(): void {
    this.tokenVerify();
  }

  tokenVerify() {
    if (!this.sesionIniciada()) {
      let tkn = this.loginService.getToken(); // Si no esta inicciada la sesion, lo hago
      localStorage.setItem('token', tkn) //guardo el token
    }
  }

  sesionIniciada() {
    let tkn = localStorage.getItem('token');
    if (!!tkn) {
      // console.log(tkn);
      console.log('Sesion iniciada')
      this.loginService.reproducir(tkn);
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


}