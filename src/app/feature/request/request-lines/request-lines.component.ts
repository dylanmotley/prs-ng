
import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { Lineitem } from 'src/app/model/lineitem.class';
import { RequestService } from 'src/app/service/request.service';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title: string = 'Request Line Items';
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

  save() {
    this.requestSvc.edit(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );

  }

  delete(lineItemId: number) {
    this.lineitemSvc.delete(lineItemId).subscribe(
      resp => {
        this.lineitem = resp as Lineitem;
        this.router.navigateByUrl('/request-list');
      },
      err => {
        console.log(err);
      }
    );
  }


  
}
