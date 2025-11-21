import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LandingComponent } from './landing/landing.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SearchResultArtistComponent } from './search-result-artist/search-result-artist.component';
import { SearchResultSongComponent } from './search-result-song/search-result-song.component';
import { SearchResultAlbumComponent } from './search-result-album/search-result-album.component';
import { PlayerComponent } from './components/playerComponent/player/player.component';
import { logGuard } from './services/log-guard.guard';
import { UserComponentComponent } from './components/UserInfo/user-component/user-component.component';
import { NoSesionComponent } from './components/NoSesion/no-sesion/no-sesion.component';
import { MyRatingsComponent } from './my-ratings/my-ratings.component';



const routes: Routes = [
  {path: 'home', component: LandingComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'about', component: AboutComponent},
  {path: 'search-result-artist', component: SearchResultArtistComponent},
  {path: 'search-result-song', component: SearchResultSongComponent},
  {path: 'search-result-album', component: SearchResultAlbumComponent},
  {path: 'no-sesion', component: NoSesionComponent},
  {path: 'player', component: PlayerComponent, canActivate: [logGuard]},
  {path: 'user', component: UserComponentComponent, canActivate: [logGuard]},
  {path: 'my-ratings', component: MyRatingsComponent},
  {path: '**', component: LandingComponent },
  {path: '', component: LandingComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
