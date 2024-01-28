import { Component, OnInit, inject } from '@angular/core';
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieCarouselComponent} from 'src/app/core/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from 'src/app/model/video-content.interface';


@Component({
  standalone:true,
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  imports:[HeaderComponent,BannerComponent,MovieCarouselComponent]
})
export class BrowseComponent implements OnInit{
  popularMovies: IVideoContent[] = [];
    ngOnInit(): void {
        this.movieService.getMovie().subscribe(resp=>{console.log(resp); this.popularMovies=resp.result;

        });
    }
auth=inject(AuthService);
movieService=inject(MovieService);
  name=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
signOut(){
  sessionStorage.removeItem("loggedInUser");

this.auth.signOut();
}
}
