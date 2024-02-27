import { Component, OnInit, inject } from '@angular/core';
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieCarouselComponent} from 'src/app/core/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from 'src/app/model/video-content.interface';
import {Observable, forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  imports:[HeaderComponent,BannerComponent,MovieCarouselComponent,CommonModule]
})
export class BrowseComponent implements OnInit{
  auth=inject(AuthService);
  movieService=inject(MovieService);
  name=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  bannerDetails=new Observable<any>();
  bannerVideo=new Observable<any>();
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovie(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies()
  ];
    ngOnInit(): void {
      forkJoin(this.sources)
        .pipe(
          map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
            this.bannerDetails=this.movieService.getBannerDetail(movies.results[0].id);
            this.bannerVideo = this.movieService.getBannerVideo(movies.results[1].id);
              return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
            }
          )
        ).subscribe((res:any)=>{
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];

      })
    }


signOut(){
  sessionStorage.removeItem("loggedInUser");

this.auth.signOut();
}
}
