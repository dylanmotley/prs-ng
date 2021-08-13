import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = 'Request-Edit';
  request: any = null;
  users: User[] = [];
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get the Request to Edit
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => {
        this.request = resp as Request;
      },
      err => { console.log(err); }
    );
  }

  save() {
    this.requestSvc.edit(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );

  }


}
