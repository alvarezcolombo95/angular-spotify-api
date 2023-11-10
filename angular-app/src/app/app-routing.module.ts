import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LandingComponent } from './landing/landing.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SearchResultArtistComponent } from './search-result-artist/search-result-artist.component';
import { SearchResultSongComponent } from './search-result-song/search-result-song.component';
import { PlayerComponent } from './components/playerComponent/player/player.component';
import { logGuard } from './services/log-guard.guard';
import { UserComponentComponent } from './components/UserInfo/user-component/user-component.component';



const routes: Routes = [
  {path: 'home', component: LandingComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'about', component: AboutComponent},
  {path: 'search-result-artist', component: SearchResultArtistComponent},
  {path: 'search-result-song', component: SearchResultSongComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'protected', component: PlayerComponent, canActivate: [logGuard]},
  {path: 'user', component: UserComponentComponent},
  {path: '**', component: LandingComponent },
  {path: '', component: LandingComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
