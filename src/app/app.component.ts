import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'thunder-cash';
  public showLoggedComponents = false

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {

    this.authService.loggedEmitter.subscribe((nextAct) => {
      this.showLoggedComponents = nextAct;
    });
    this.authService.isLoggedIn();
  }

  signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.showLoggedComponents = false
    this.router.navigateByUrl('/login');
  }

}
