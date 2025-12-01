import { AfterViewInit, Component, NgModule, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  profilePicUrl: string = '';
  nombreUsuario: string = '';
  followers: number = 0;
  recentArtists: any[] = [];  
  recentItems: any[] = [];    
  showType: string = 'Canciones';
  termType: string = 'Ultimos 6 meses';
  term: string = 'medium_term';
  type: string = 'tracks';
  playlistSuccess: boolean = false;
  genreCounts: any = null;
  genreChart: any;
  dataLoaded: boolean = false;

  //safely reference the canvas
  @ViewChild('genreChartCanvas') genreCanvas!: ElementRef;

  constructor(
    private loginservice: LoginService,
    private userservice: UserService,
    private playlistService: PlaylistService
  ) {}

  async ngOnInit() {

    if (!this.loginservice.checkLog()) {
      console.log("User is not logged in — stopping ngOnInit");
      return;
    }

    this.nombreUsuario = await this.getName();
    this.profilePicUrl = await this.getProfilePic();
    this.followers = await this.getFollowers();

    this.recentItems = await this.getRecentItems('tracks', 'medium_term');
    this.recentArtists = await this.getRecentItems('artists', 'medium_term');

    this.dataLoaded = true;

    this.extractGenres();
  }

  ngAfterViewInit() {
    if (this.dataLoaded) {
      this.buildGenreChart();
    }
  }

  //Devuelve un string de varias canciones
  getUris() {
    let uriString: string = '';
    if (this.recentItems && this.recentItems.length > 0) {
      uriString = this.recentItems.map(track => track.uri).join(',');
      this.recentItems.forEach(track => {
        uriString += track.uri.join(',');
      });
    }
    console.log(uriString);
    return uriString;
  }

  async createPlaylist() {
    let token = this.loginservice.getToken();
    let userId = await this.getId();
    let fechaActual = new Date();
    let ano = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; 
    let dia = fechaActual.getDate();

    if (token != null) {
      let playlistId = await this.playlistService.createPlaylist(
        token,
        userId,
        `${this.showType}-${this.termType}-${ano}-${mes}-${dia}`
      );

      for (let i = 0; i < this.recentItems.length; i++) {
        if (token != null) {
          await this.playlistService.addTrack(playlistId, token, this.recentItems[i].uri);
          await new Promise(resolve => setTimeout(resolve, 100));
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

    this.extractGenres();
    this.buildGenreChart();
  }

  async toggleShowType() {
    this.playlistSuccess = false;

    this.showType = (this.showType === 'Canciones' ? 'Artistas' : 'Canciones');

    this.recentItems = await this.getRecentItems('tracks', this.term);
    this.recentArtists = await this.getRecentItems('artists', this.term);

    this.extractGenres();
    this.buildGenreChart();
  }

  async getRecentItems(type: string, term: string) {
    try {
      const response = await this.userservice.recentItems(type, term);
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getName() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getId() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getProfilePic() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      return data.images[1].url;
    }
    catch (error) {
      console.log(error);
    }
  }

  async getFollowers() {
    try {
      const response = await this.userservice.getUser();
      const data = await response.json();
      return data.followers.total;
    }
    catch (error) {
      console.log(error);
    }
  }

  isLoged() {
    return this.loginservice.checkLog() ? 1 : 0;
  }

  extractGenres() {
    const counts: any = {};

    console.log("Extracting genres...")
    for (const artist of this.recentArtists) {
      if (artist.genres) {
        for (const genre of artist.genres) {
          counts[genre] = (counts[genre] || 0) + 1;
        }
      }
    }

    const sorted = Object.entries(counts)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 10);

    this.genreCounts = Object.fromEntries(sorted);
  }

  buildGenreChart() {
  if (!this.genreCounts) {
    console.log("!this.genreCounts");
    return;
  }

  //ALLOW ANGULAR TO RENDER THE CANVAS BEFORE RUNNING CHART.JS
  setTimeout(() => {
    if (!this.genreCanvas) {
      console.log("Canvas not ready yet");
      return;
    }

    const labels = Object.keys(this.genreCounts);
    const values = Object.values(this.genreCounts);

    if (this.genreChart) {
      console.log("Destroying old chart");
      this.genreChart.destroy();
    }

    console.log("building new chart");
    this.genreChart = new Chart(this.genreCanvas.nativeElement, {
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
          legend: { position: 'right' }
        }
      }
    });
  });
}

  generateColors(count: number) {
    console.log("Generating colors of chart")
    return Array.from({ length: count }, () =>
      `hsl(${Math.random() * 360}, 75%, 50%)`
    );
  }
}