import { Component } from '@angular/core';
import { UserService } from '../services/UserService/user.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  
  
  constructor(private userService: UserService, private loginService: LoginService) { }

  
}

