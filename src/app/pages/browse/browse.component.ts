import { Component, inject } from '@angular/core';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  standalone:true,
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  imports:[HeaderComponent]
})
export class BrowseComponent {
auth=inject(AuthService);
  name=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
signOut(){
  sessionStorage.removeItem("loggedInUser");

this.auth.signOut();
}
}
