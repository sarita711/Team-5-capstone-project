import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EventPageComponent } from './event-page/event-page.component';
 
const routes: Routes = [
 
  { path: 'login', component: LoginComponent },
  {path: 'event-page', component:EventPageComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
