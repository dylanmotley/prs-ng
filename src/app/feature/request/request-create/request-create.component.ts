import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Request-Create';
  request: Request = new Request();
  loggedInUser: User = new User();
  

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("User List, checking logged in sysSvc: ", this.sysSvc.loggedInUser);
    this.request.user = this.sysSvc.loggedInUser;
  }

  save() {
    this.requestSvc.create(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );

  }
}

