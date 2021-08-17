import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  title: string = 'Product Manager';
  loggedInUser: User = new User();

  constructor(
    private productSvc: ProductService,
    private sysSvc: SystemService
    ) { }

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.sysSvc.checkLogin();
    this.productSvc.list().subscribe(
      resp => {
        this.products = resp as Product[];
      },
        err => { console.log(err);}
        );
  }

}
