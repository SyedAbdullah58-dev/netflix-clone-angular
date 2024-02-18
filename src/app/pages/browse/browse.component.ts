import { Component, OnInit, inject } from '@angular/core';
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieCarouselComponent} from 'src/app/core/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from 'src/app/model/video-content.interface';
import {forkJoin, map } from 'rxjs';


@Component({
  standalone:true,
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  imports:[HeaderComponent,BannerComponent,MovieCarouselComponent]
})
export class BrowseComponent implements OnInit{
  auth=inject(AuthService);
  movieService=inject(MovieService);
  name=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
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


  ];
    ngOnInit(): void {
      forkJoin(this.sources)
        .pipe(
          map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
              return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
            }
          )
        ).subscribe((res:any)=>{
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];



      })
    }


signOut(){
  sessionStorage.removeItem("loggedInUser");

this.auth.signOut();
}
}
