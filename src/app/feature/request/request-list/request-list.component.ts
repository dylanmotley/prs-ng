import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  title: string = 'Request Manager';

  constructor(private requestSvc: RequestService) { }

  ngOnInit(): void {
    this.requestSvc.list().subscribe(
      resp => {
        this.requests = resp as Request[];
          console.log("list of requests: ", this.requests);},
        err => { console.log(err);}
        );
  }

}
