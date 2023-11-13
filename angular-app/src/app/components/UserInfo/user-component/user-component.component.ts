import { Component, NgModule, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  
  nombreUsuario!:string ;
  profilePicUrl!: string;
  followers!: string;
  recentItems = [];
  showType: string = 'Canciones'
  term: string = 'short_term';
  type: string = 'tracks';

  constructor(private loginservice: LoginService, private userservice: UserService) {
  }

  async ngOnInit() {
    this.nombreUsuario = await this.getName();
    this.profilePicUrl = await this.getProfilePic();
    this.followers = await this.getFollowers();
    this.recentItems = await this.getRecentItems('tracks','short_term');
  }

 

  async toggleShowType(){
    this.showType = (this.showType === 'Canciones'? 'Artistas': 'Canciones');
    this.type = (this.type === 'tracks'? 'artists': 'tracks');
    this.term = (this.term === 'short_term'? 'medium_term': 'short_term');
    this.recentItems= await this.getRecentItems(this.type,this.term);
   }

   async getRecentItems(type:string,term:string){
    try {
      const response = await this.userservice.recentItems(type,term);
      const data = await response.json();
      console.log(data.items);
      return data.items;
    } catch (error) {
      console.error('Error:', error);
    }
   }
   
   
  async getName() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data);
      console.log(data.display_name);
      return data.display_name;
    } catch (error) {
      console.error('Error:', error);
    }
   }

  async getProfilePic(){
    try{const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.images[1].url);
      return data.images[1].url;
    }
    catch(error){
      console.log(error)
    }
  }
  async getFollowers(){
    try{const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.followers.total);
      return data.followers.total;
    }
    catch(error){
      console.log(error)
    }
  }


  isLoged() {
    if (this.loginservice.checkLog())
      return 1;
    else
      return 0;
  }
}

