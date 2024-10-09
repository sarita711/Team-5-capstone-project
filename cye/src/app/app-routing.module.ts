import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNormalUserComponent } from './home-normal-user/home-normal-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
  {path: 'home-normal-user', component: HomeNormalUserComponent},
  {path:'', redirectTo:'/home-normal-user', pathMatch: 'full'},
  {path:'contact-us', component:ContactUsComponent },
  {path:'', redirectTo: '/contact-us', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
