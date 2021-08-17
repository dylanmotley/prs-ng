import { Component, OnInit } from '@angular/core';
import { Lineitem } from 'src/app/model/lineitem.class';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './lineitem-edit.component.html',
  styleUrls: ['./lineitem-edit.component.css']
})
export class LineitemEditComponent implements OnInit {
  title: string = 'Lineitem-Edit';
  lineitem: any = null;
  products: Product[] = [];
  lineitemId: number = 0;

  constructor(
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get the Lineitem to Edit
    this.route.params.subscribe(parms => this.lineitemId = parms["id"]);
    this.lineitemSvc.get(this.lineitemId).subscribe(
      resp => {
        this.lineitem = resp as Lineitem;
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
    this.lineitemSvc.edit(this.lineitem).subscribe(
      resp => {
        this.lineitem = resp as Lineitem;
        this.router.navigateByUrl("/lineitem-list");
      },
      err => { console.log(err); }
    );

  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }


}
