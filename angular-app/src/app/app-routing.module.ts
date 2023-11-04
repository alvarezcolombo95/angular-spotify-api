import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LandingComponent } from './landing/landing.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';




const routes: Routes = [
  {path: 'home', component: LandingComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
