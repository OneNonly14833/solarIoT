import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
