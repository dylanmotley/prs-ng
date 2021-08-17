import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { Lineitem } from 'src/app/model/lineitem.class';
import { ProductService } from 'src/app/service/product.service';
import { LineitemService } from 'src/app/service/lineitem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineitemCreateComponent implements OnInit {
  title: string = 'Lineitem-Create';
  products: Product[] = [];
  lineitem: Lineitem = new Lineitem();
  requestId: number = 0;
  request: Request = new Request();
  lineitems: Lineitem[] = [];


  constructor(
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Set User to Logged In User
    this.request.user = this.systemSvc.loggedInUser;

    // Get Request for ID
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => {
        // Set Request in LineItem
        this.lineitem.request = resp as Request;
      },
      err => { console.log(err); }
      );

    // Populate List of Products
    this.productSvc.list().subscribe(
      resp => {
        this.products = resp as Product[];
      },
      err => { console.log(err); }
    );

  }

  save() {
    this.lineitemSvc.create(this.lineitem).subscribe(
      resp => {
        this.lineitem = resp as Lineitem;
        this.router.navigateByUrl("/request-lines/"+this.requestId);
      },
      err => { console.log(err); }
    );

  }
  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

}

