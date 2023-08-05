import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ConvertPanelComponent } from './convert-panel/convert-panel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';
import { CategoryService, ChartModule, DataLabelService, LegendService, LineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    HeaderComponent,
    ConvertPanelComponent,
    CurrencyChartComponent
  ],
  imports: [
    CommonModule ,
    FormsModule ,
    HttpClientModule ,
    RouterModule ,
    NgxHttpLoaderModule ,
    ChartModule ,

  ] ,
  providers : [
    LineSeriesService ,
    CategoryService ,
    LegendService ,
    DataLabelService ,
    TooltipService
  ] ,
  exports : [
    HeaderComponent ,
    ConvertPanelComponent ,
    CurrencyChartComponent
  ]
})
export class SharedModule { }
