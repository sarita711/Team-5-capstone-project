import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashCompanyUserComponent } from './dash-company-user/dash-company-user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'dash-company-user', component: DashCompanyUserComponent},
  {path: '', redirectTo: '/dash-company-user', pathMatch: 'full'},
  {path: 'about-us', component: AboutUsComponent},
  {path: '', redirectTo: '/about-us', pathMatch: 'full'},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}