import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxHttpLoaderModule } from 'ngx-http-loader';


@NgModule({
  declarations: [
    CurrencyDetailsComponent
  ],
  imports: [
    CommonModule ,
    RouterModule ,
    SharedModule ,
    NgxHttpLoaderModule
  ] ,
  exports : [
    CurrencyDetailsComponent
  ]
})
export class CurrencyModule { }
