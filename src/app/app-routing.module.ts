import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrencyDetailsComponent } from './currency/components/currency-details/currency-details.component';

const routes: Routes = [
  {path : "" , redirectTo : "home" , pathMatch : 'full'} ,
  {path : "home" , component : HomeComponent} ,
  {path : "details" , component : CurrencyDetailsComponent} ,
  {path : "**" , redirectTo : "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// interceptor
//handel requestes
//
