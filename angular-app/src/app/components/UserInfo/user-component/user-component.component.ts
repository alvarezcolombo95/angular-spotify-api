import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  nombreUsuario!:string ;

  constructor(private loginservice: LoginService, private userservice: UserService) {
  }

  async ngOnInit() {
    this.nombreUsuario = await this.getName();
  }


  //private activeUser = this.userservice.getUser();
  async getName() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.display_name);
      return data.display_name;
    } catch (error) {
      console.error('Error:', error);
    }
   }
   
  //  console.log(await activeUser.json());
  


  isLoged() {
    if (this.loginservice.checkLog())
      return 1;
    else
      return 0;
  }
}

