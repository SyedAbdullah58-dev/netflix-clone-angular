import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { IVideoContent } from 'src/app/model/video-content.interface';
import Swiper from 'swiper';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import {animate, style, transition, trigger } from '@angular/animations';
import { DescriptionPipe } from 'src/app/Pipes/description.pipe';
import { ImagePipe } from 'src/app/Pipes/image.pipe';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  standalone:true,
  imports: [NgFor, NgIf,CommonModule,DescriptionPipe,ImagePipe],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  constructor() { }
  ngAfterViewInit(): void {
    console.log("VideoContent : "+ this.videoContents[0]);
    this.initSwiper();
  }

  ngOnInit() {
    console.log("VideoContent : "+ this.videoContents[0]);
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      loop: true,
      slidesPerView: 4,  // Adjust this value
      slidesPerGroup: 3,
      centeredSlides: true,
      breakpoints: {
        600: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }
}
