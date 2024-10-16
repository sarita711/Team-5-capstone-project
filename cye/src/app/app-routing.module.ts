import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashCompanyUserComponent } from './dash-company-user/dash-company-user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeNormalUserComponent } from './home-normal-user/home-normal-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EventPageComponent } from './event-page/event-page.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'dash-company-user', component: DashCompanyUserComponent, canActivate: [AuthGuard] },

  {path: 'about-us', component: AboutUsComponent},

  {path: 'home-normal-user', component:HomeNormalUserComponent},

  {path: 'contact-us', component: ContactUsComponent},
  {path: 'wishlist', component:WishlistComponent},
  
  
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'event-page/:id', component: EventPageComponent },
  { path: '**', redirectTo: 'login' } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
