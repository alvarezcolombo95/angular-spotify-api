import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  constructor(private loginservice: LoginService) {
  }


  ngOnInit(): void {
  }

  isLoged() {
    if (this.loginservice.checkLog())
      return 1;
    else
      return 0;
  }

}
