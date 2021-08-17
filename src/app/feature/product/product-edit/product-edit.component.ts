import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { Product } from 'src/app/model/product.class';
import { VendorService } from 'src/app/service/vendor.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = 'Product-Edit';
  product: any = null;
  vendors: Vendor[] = [];
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get the Product to Edit
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(
      resp => {
        this.product = resp as Product;
      },
      err => { console.log(err); }
    );
    // Populate List of Vendors
    this.vendorSvc.list().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
      },
      err => { console.log(err); }
    );
  }

  save() {
    this.productSvc.edit(this.product).subscribe(
      resp => {
        this.product = resp as Product;
        this.router.navigateByUrl("/product-list");
      },
      err => { console.log(err); }
    );

  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }


}
