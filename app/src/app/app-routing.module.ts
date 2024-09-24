import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { BlogpostsComponent } from './Components/blogposts/blogposts.component';
import { GamesComponent } from './Components/games/games.component';
import { AsteroidsComponent } from './Components/asteroids/asteroids.component';
import { HackathonComponent } from './Components/hackathon/hackathon.component';
import { DailyChallangeComponent } from './Components/daily-challange/daily-challange.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
  {path: "Home", component: HomeComponent},
  {path: "Blog", component: BlogpostsComponent},
  {path: "Games", component: GamesComponent},
  {path: "Hack", component: HackathonComponent},
  {path: "DailyChallange", component: DailyChallangeComponent},
  {path: "Profile", component: ProfileComponent},
  {path: "Asteroids", component: AsteroidsComponent},
];

export class AppRoutingModule { }
