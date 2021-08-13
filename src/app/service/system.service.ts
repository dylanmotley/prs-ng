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

}
