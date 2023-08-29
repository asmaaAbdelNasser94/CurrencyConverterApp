import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxLoader } from 'ngx-http-loader';
import { CurrencyService } from 'src/app/currency/services/currency.service';
@Component({
  selector: 'app-convert-panel',
  templateUrl: './convert-panel.component.html',
  styleUrls: ['./convert-panel.component.scss']
})
export class ConvertPanelComponent {
  public loader = NgxLoader;
  @Output() PopularConversions = new EventEmitter<{}[]>();
  @Input() amount!: number;
  @Input() current: string = 'EUR';
  @Input() desired: string = 'USD';
  @Input() disable: boolean = true;
  @Input() isHome: boolean = true;
  @Input() currentRate!: number;
  @Input() desiredRate!: number;
  convertedResult!: number;
  desiredResult!: number;
  currencies: string[] = [];
  currenciesRates: any;
  baseEuroRate: number = 1;
  currencyForm: FormGroup = new FormGroup({
    fromCurrency: new FormControl({ value: this.current, disabled: true }),
    toCurrency: new FormControl({ value: this.desired, disabled: true })
  })
  popularRates: {}[] = [];
  popularCurrencies: string[] = [
    'USD',
    'AUD',
    'CAD',
    'CHF',
    'SAR',
    'JPY',
    'GBP',
    'NZD',
    'ZAR'
  ]
  constructor(private _CurrencyService: CurrencyService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCurrencies();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isHome) {
      this.currencyForm.controls['toCurrency'].enable();
      this.currencyForm.controls['fromCurrency'].setValue(this.current);
      this.currencyForm.controls['toCurrency'].setValue(this.desired);
      this.convertProcess();
    }
  }
  // Get all currencies data
  getCurrencies(): void {
    this._CurrencyService.getCurrency().subscribe((res) => {
      this.currenciesRates = res.rates;
      for (const key in this.currenciesRates) {
        this.currencies.push(key);
        if (this.isHome) {
          if (key == 'EUR') {
            this.currentRate = this.currenciesRates[key];
          }
          if (key == 'USD') {
            this.desiredRate = this.currenciesRates[key];
          }
        }
      }
    })
  }
  // when amount input change
  onAmountChange(): void {
    if (this.amount !== null && this.amount !== undefined) {
      this.disable = false;
      this.currencyForm.enable();
      localStorage.setItem('amount', JSON.stringify(this.amount));
      if (this.isHome) {
        this.currencyForm.controls['fromCurrency'].enable();
      } else {
        this.currencyForm.controls['fromCurrency'].disable();
      }
    } else {
      this.disable = true;
      this.currencyForm.disable();
      this.convertedResult = 0;
      this.PopularConversions.emit();
    }

  }
  // swap between exists currencies
  swapCurrencies(): void {
    //EURO => USD
    //USD => USD
    const current = this.currencyForm.controls['fromCurrency'].value;
    const desierd = this.currencyForm.controls['toCurrency'].value;
    this.currencyForm.controls['fromCurrency'].setValue(desierd)
    this.currencyForm.controls['toCurrency'].setValue(current)
    this.current = desierd;
    this.desired = current;
    for (const key in this.currenciesRates) {
      if (key == this.current) {
        this.currentRate = this.currenciesRates[key];
      }
      if (key == this.desired) {
        this.desiredRate = this.currenciesRates[key];
      }
    }
    // check if convert btn pressed once then auto converted on swap
    if (this.convertedResult) {
      this.convertProcess();
    }
  }
  // Get rate for the current currency
  getCurrentRate(value: any) {
    this.current = value;
    this._CurrencyService.getRate(this.current).subscribe((res) => {
      this.currentRate = res.rates[this.current];
    })
  }
  // Get rate for the desired currency
  getdesiredRate(value: any) {
    this.desired = value;
    this._CurrencyService.getRate(this.desired).subscribe((res) => {
      this.desiredRate = res.rates[this.desired];
    })
    if (!this.isHome) {
      this._Router.navigate(
        [],
        {
          relativeTo: this._ActivatedRoute,
          queryParams: { to: this.desired },
          queryParamsHandling: 'merge'
        });
    }
  }

  convertProcess() {

    this.desiredResult = ((this.baseEuroRate / this.currentRate) / (this.baseEuroRate / this.desiredRate));
    this.convertedResult = this.desiredResult * this.amount;
    this.PopularProcess(this.currentRate);
    console.log(this.currencyForm.value);

  }
  // convert process for most 9 popular currencies
  PopularProcess(from: number) {
    this.popularRates = [];
    for (const currency of this.popularCurrencies) {
      for (const key in this.currenciesRates) {
        if (currency == key) {
          const to = this.currenciesRates[key];
          const desired = ((this.baseEuroRate / from) / (this.baseEuroRate / to));
          const popularResult = desired * this.amount;
          this.popularRates.push({
            baseCru: this.current,
            popularCur: currency,
            rate: desired,
            convertedRes: popularResult
          })
        }
      }
    }
    this.PopularConversions.emit(this.popularRates);
  }

}

