declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private router=inject(Router);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '559165987307-v1ad644qh2n6898rnkogpag6a362n8rp.apps.googleusercontent.com',
      callback: (resp: any)=> {
this.handleLogin(resp);
      }
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circle',
      width: 350
    })
}
private decodeToken(token:string){
  return JSON.parse(atob(token.split('.')[1]));
}
  handleLogin(response:any){
    if(response){
      const cred=this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser",JSON.stringify(cred));
      this.router.navigate(['browse'])
    }
  }
}
