import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  url: string = 'http://data.fixer.io/api/';
  apiKey: string = 'ff8d928f69557cd6598acc0b89436286';
  constructor(private _HttpClient: HttpClient) { }

  // Get all currencies
  getCurrency(): Observable<any> {
    return this._HttpClient.get(`${this.url}latest?access_key=${this.apiKey}`)
  }
  // Get currency rate
  getRate(symbol : string) : Observable<any>{
    return this._HttpClient.get(`${this.url}latest?access_key=${this.apiKey}&symbols=${symbol}`)
  }
  // Get current full name
  getSymbols(): Observable<any> {
    return this._HttpClient.get(`${this.url}symbols?access_key=${this.apiKey}`)
  }
  // Get historical rates in past year
  getHistoricalRates(month: string, symbol1: string, symbol2: string , day : string) : Observable<any> {
    return this._HttpClient.get(`${this.url}2022-${month}-${day}?access_key=${this.apiKey}&symbols=${symbol1},${symbol2}`)
  }
}
