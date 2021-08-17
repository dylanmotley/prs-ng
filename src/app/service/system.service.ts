import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  loggedInUser: User = new User();

  constructor(
    private router: Router
  ) { }

  checkLogin(): void {
    // if user is not logged in, send to login page.
    // Aug 2021 - if user is logged in the loggedInUser.id
    // should be > 0
    // comment out this code for testing purposes
    if (this.loggedInUser.id == 0) {
      console.log("User is not logged in... redirecting to login.");
      this.router.navigateByUrl("/user-login");
    }
  }

}
