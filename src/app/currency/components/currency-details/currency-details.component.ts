import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { NgxLoader } from 'ngx-http-loader';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})

export class CurrencyDetailsComponent {
  public loader = NgxLoader;
  isDisable: boolean = false;
  current!: string;
  desired!: string;
  currentRate!: number;
  desiredRate!: number;
  amount!: number;
  convertedResult!: number;
  desiredResult!: number;
  fullName!: string;
  constructor(private _CurrencyService: CurrencyService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router) {
    // Refresh component on params change
    this._Router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    // get current and desierd currencies
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.current = params['from'];
      this.desired = params['to'];
    })
    // get amount
    if (localStorage.getItem('amount')) {
      this.amount = Number(localStorage.getItem('amount'));
    } else {
      localStorage.setItem("amount", "1");
      this.amount = Number(localStorage.getItem('amount'));
    }
    this.getRates(this.current, this.desired);
    this.getCurrentFullName();
  }

  // Get currency full name
  getCurrentFullName(): void {
    this._CurrencyService.getSymbols().subscribe((res) => {
      const symbols = res.symbols;
      for (const key in symbols) {
        if (key == this.current) {
          this.fullName = symbols[key]
        }
      }
    })

  }
  // Get current and desierd currensies rates
  getRates(current: string, desired: string): void {
    this._CurrencyService.getRate(`${current},${desired}`).subscribe((res) => {
      const response = res.rates;
      for (const key in response) {
        if (current == key) {
          this.currentRate = response[key];
        }
        if (desired == key) {
          this.desiredRate = response[key];
        }
      }
    })
  }
}
