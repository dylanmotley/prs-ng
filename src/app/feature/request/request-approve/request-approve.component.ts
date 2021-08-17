
import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { Lineitem } from 'src/app/model/lineitem.class';
import { RequestService } from 'src/app/service/request.service';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title: string = 'Request Approve/Reject';
  lineitems: Lineitem[] = [];
  request: Request = new Request();
  requestId: number = 0;
  lineitem: Lineitem = new Lineitem();

  constructor(
    private lineitemSvc: LineitemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => {
        this.request = resp as Request;
      },
      err => { console.log(err); }
    );

    this.lineitemSvc.getRequestLineitems(this.requestId).subscribe(
      resp => {
        this.lineitems = resp as Lineitem[];
      },
      err => { console.log(err); }
    );
  }

  approve() {
    this.requestSvc.approve(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );
  }
  reject() {
    this.requestSvc.reject(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );
  }


}
