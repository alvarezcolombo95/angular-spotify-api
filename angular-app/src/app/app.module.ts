import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SearchResultSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
