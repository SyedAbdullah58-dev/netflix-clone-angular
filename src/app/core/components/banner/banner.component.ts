import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone:true
})
export class BannerComponent {
@Input({required:true}) bannerTitle="";
@Input() bannerOverview="";
  @Input() key = '';

}
