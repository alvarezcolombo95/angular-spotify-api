import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/PlaylistService/playlist.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit, AfterViewInit {

  //initialize to avoid bug displaying while not being logged
  profilePicUrl: string = '';
  nombreUsuario: string = '';
  followers: number = 0;
  recentArtists: any[] = [];  
  recentItems: any[] = [];    
  showType: string = 'Canciones'
  termType: string = 'Ultimos 6 meses'
  term: string = 'medium_term';
  type: string = 'tracks';
  playlistSuccess: boolean = false;
  genreCounts: any = null;
  genreChart: any;
  dataLoaded: boolean = false;

  constructor(private loginservice: LoginService, private userservice: UserService, private playlistService: PlaylistService) {
  }

  async ngOnInit() {

  if (!this.loginservice.checkLog()) {
    console.log("User is not logged in — stopping ngOnInit");
    return;
  }

  this.nombreUsuario = await this.getName();
  this.profilePicUrl = await this.getProfilePic();
  this.followers = await this.getFollowers();

  // Wait for items to load
  this.recentItems = await this.getRecentItems('tracks', 'medium_term');
  this.recentArtists = await this.getRecentItems('artists', 'medium_term');
  this.dataLoaded = true; 
  // Build chart only after artists exist
  this.extractGenres();
  this.buildGenreChart();
}

ngAfterViewInit() {
  const interval = setInterval(() => {
    if (this.dataLoaded) {
      this.buildGenreChart();
      clearInterval(interval);
    }
  }, 50);
}


  getUris() {//Devuelve un string de varias canciones
    let uriString: string = '';
    if (this.recentItems && this.recentItems.length > 0) {
      uriString = this.recentItems.map(track => track.uri).join(',');
      this.recentItems.forEach(track => {
        uriString += track.uri.join(',');
      });
    }
    console.log(uriString)
    return uriString;

  }



  async createPlaylist() {
    let token = this.loginservice.getToken()
    let userId = await this.getId();
    let fechaActual = new Date();
    let ano = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; 
    let dia = fechaActual.getDate();
    if (token != null) {
      let playlistId = await this.playlistService.createPlaylist(token, userId, `${this.showType}-${this.termType}-${ano}-${mes}-${dia}`)
      console.log(playlistId)
      for (let i=0;i<this.recentItems.length;i++){
        if (token != null) {// If para que la funcion tome el token//PROBAR INSISTIR SI TIRA ERROR?
        await this.playlistService.addTrack(playlistId, token, this.recentItems[i].uri) //Agrego canciones 1 por 1 //Algunas agrega otras no!! eror 500/502
        await new Promise(resolve=> setTimeout(resolve,100));
        this.playlistSuccess = true;
      }
        
         }
      }
    }
  


  async toggleTermType() {
    this.playlistSuccess = false;
    this.term = (this.term === 'short_term' ? 'medium_term' :
      this.term === 'medium_term' ? 'long_term' : 'short_term');
    this.termType = this.termType === 'Ultimos 6 meses' ? 'All time' :
      this.termType === 'All time' ? 'Ultimo mes' : 'Ultimos 6 meses';
    this.recentItems = await this.getRecentItems('tracks', this.term);
    this.recentArtists = await this.getRecentItems('artists', this.term);

    //update chart
    this.extractGenres(); 
    this.buildGenreChart(); 
  }

  async toggleShowType() {
    this.playlistSuccess = false;
    this.showType = (this.showType === 'Canciones' ? 'Artistas' : 'Canciones');
    //this.type = (this.type === 'tracks'? 'artists': 'tracks');
    this.recentItems = await this.getRecentItems('tracks', this.term);
    this.recentArtists = await this.getRecentItems('artists', this.term);

    //update chart
    this.extractGenres(); 
    this.buildGenreChart(); 
  }

  async getRecentItems(type: string, term: string) {
    try {
      const response = await this.userservice.recentItems(type, term);
      const data = await response.json();
      //console.log(data.items);
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
      return data.display_name;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getId() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.id);
      return data.id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getProfilePic() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      console.log(data.images[1].url);
      return data.images[1].url;
    }
    catch (error) {
      console.log(error)
    }
  }
  async getFollowers() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      //console.log(data.followers.total);
      return data.followers.total;
    }
    catch (error) {
      console.log(error)
    }
  }


  isLoged() {
    if (this.loginservice.checkLog())
      return 1;
    else
      return 0;
  }

  //Extract genres and count them
  extractGenres() {
  const counts: any = {};

  for (const artist of this.recentArtists) {
    if (artist.genres) {
      for (const genre of artist.genres) {
        counts[genre] = (counts[genre] || 0) + 1;
      }
    }
  }

  // Convert to array, sort, and keep top 10
  const sorted = Object.entries(counts)
    .sort((a: any, b: any) => b[1] - a[1])      // sort by count desc
    .slice(0, 10);                               // keep only top 10

  // Rebuild as object
  this.genreCounts = Object.fromEntries(sorted);
}

  //Build the chart using Chart.js
  buildGenreChart() {
    const labels = Object.keys(this.genreCounts);
    const values = Object.values(this.genreCounts);

    if (this.genreChart) {
      this.genreChart.destroy(); // avoid duplicates
    }

    this.genreChart = new Chart("genreChartCanvas", {
      type: "doughnut",
      data: {
        labels: labels,
        
        datasets: [{
          data: values,
          backgroundColor: this.generateColors(labels.length)
        }],        
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }  
    });    
  }

  //Generate random colors for the chart
  generateColors(count: number) {
    return Array.from({ length: count }, () =>
      `hsl(${Math.random() * 360}, 75%, 50%)`
    );
  }
}

