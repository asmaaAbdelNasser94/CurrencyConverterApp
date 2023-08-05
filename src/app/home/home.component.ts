import { Component } from '@angular/core';
import { NgxLoader } from 'ngx-http-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public loader = NgxLoader;
  popularConversions! : any;

  // Get popular process result
  getPopularConversions(val : any) : void {
    this.popularConversions = val;
  }
}
