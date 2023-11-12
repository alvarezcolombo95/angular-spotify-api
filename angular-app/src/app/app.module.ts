import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultArtistComponent } from './search-result-artist/search-result-artist.component';
import { ContainerMainComponent } from './container-main/container-main.component';
import { ContainerContentComponent } from './container-content/container-content.component';
import { ContainerResultsComponent } from './container-results/container-results.component';
import { SearchResultSongComponent } from './search-result-song/search-result-song.component';
import { DetailArtistComponent } from './detail-artist/detail-artist.component';
import { PlayerComponent } from './components/playerComponent/player/player.component';
import { UserComponentComponent } from './components/UserInfo/user-component/user-component.component';
import { TrackComponent } from './components/Track/track/track.component';
import { DetailSongComponent } from './detail-song/detail-song.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    AboutComponent,
    LogInComponent,
    SearchboxComponent,
    SearchResultArtistComponent,
    ContainerMainComponent,
    ContainerContentComponent,
    ContainerResultsComponent,
    SearchResultSongComponent,
    DetailArtistComponent,
    PlayerComponent,
    UserComponentComponent,
    TrackComponent,
    DetailSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
