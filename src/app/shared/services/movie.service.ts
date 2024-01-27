
import {Injectable, inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDcyMmY2ZTgyNDE0NDI0NDEzNTE1ODFkYzEwYzMwYyIsInN1YiI6IjY1YWQyZDQwM2UyZWM4MDBlYmVmNGU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GlpL3vy9CuoDK_aVPNbV58Kj2Ng7PR_uzix9tJhacXc'
  }
}
@Injectable({providedIn:'root'})
export class MovieService{
 http=inject(HttpClient);
  constructor() {

  }
getMovie(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie',options);
}
}
