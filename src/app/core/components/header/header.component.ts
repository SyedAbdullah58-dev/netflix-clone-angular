import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[CommonModule]
})
export class HeaderComponent {
  @Input ({required:true}) userImg: string = '';
navList=["Home","TV Shows","News & Popular","Browse My Language", "My List"]
}
