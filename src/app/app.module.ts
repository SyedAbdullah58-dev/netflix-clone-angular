import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet, Routes} from "@angular/router";
import { BrowseComponent } from './pages/browse/browse.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { provideHttpClient } from '@angular/common/http';
import { MovieCarouselComponent } from './core/components/movie-carousel/movie-carousel.component';
import { DescriptionPipe } from './Pipes/description.pipe';
import { ImagePipe } from './Pipes/image.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    DescriptionPipe,
    ImagePipe,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
