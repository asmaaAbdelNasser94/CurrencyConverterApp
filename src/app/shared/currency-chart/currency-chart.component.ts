import { Component, Input } from '@angular/core';
import { CurrencyService } from 'src/app/currency/services/currency.service';
import { NgxLoader } from 'ngx-http-loader';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss']
})
export class CurrencyChartComponent {
  public loader = NgxLoader;
  @Input() current!: string;
  @Input() desired!: string;
  public data: object[] = [];
  public xAxis!: object;
  public yAxis!: object;
  public chartTitle!: string;
  public legend!: object;
  public markerSettings!: object;
  public tooltipSettings!: object;
  public months: any[] =
    [
      { month: 'Jan', id: "01" }, { month: 'Feb', id: "02" },
      { month: 'Mar', id: "03" }, { month: 'Apr', id: "04" },
      { month: 'May', id: "05" }, { month: 'Jun', id: "06" },
      { month: 'Jul', id: "07" }, { month: 'Aug', id: "08" },
      { month: 'Sep', id: "09" }, { month: 'Oct', id: "10" },
      { month: 'Nov', id: "11" }, { month: 'Dec', id: "12" }
    ]
  rates: object[] = [];
  lastDay: number[] = [];
  currentRateMonth! : number;
  desiredRateMonth! : number
  constructor(private _CurrencyService: CurrencyService) {
    this.tooltipSettings = {
      enable: true
    }
    this.markerSettings = {
      visible: true,
      dataLabel: {
        visible: true
      }
    }
    this.legend = {
      visible: true
    };
    this.xAxis = {
      title: 'Month',
      valueType: 'Category',
      majorTickLines: {
        color: '#2666CF',
        width: 5
      }
    };
    this.yAxis = {
      title: 'Rates',
      majorTickLines: {
        color: '#2666CF',
        width: 5
      },

    }
  }

  ngOnInit(): void {
    this.chartTitle = `(${this.current} - ${this.desired}) Currency Analysis 2022`;
    this.getLastDay();
    this.getHistory();
  }
  // Get historical rates in past year
  getHistory(): void {
    this.months.map((item) => {
      this._CurrencyService.getHistoricalRates(item.id, this.current, this.desired, item.lastDay).subscribe((res) => {
        const ratesResponse = res.rates;
        for (const key in ratesResponse) {
          if(key == this.current){
            this.currentRateMonth  = ratesResponse[this.current];
          }
          if(key == this.desired){
            this.desiredRateMonth = ratesResponse[this.desired];
          }
        }
        this.rates.push({
          month: item.month,
          rate: +((1 / this.currentRateMonth) / (1 / this.desiredRateMonth)).toFixed(5)
        })
      })
    })
  }
  // Get the last day of the month
  getLastDay(): void {
    for (let i = 0; i < 12; i++) {
      var d = new Date(`2022 , ${i + 1}`);
      const date = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      this.months.map((item) => {
        if (item.id == i + 1) {
          item['lastDay'] = date;
        }
      })
    }
  }
}

