import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashguardGuard } from './dashguard.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { SettingComponent } from './setting/setting.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: HomepageComponent, canActivate: [DashguardGuard]},
  {path: 'setting', component: SettingComponent, canActivate: [DashguardGuard]},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
