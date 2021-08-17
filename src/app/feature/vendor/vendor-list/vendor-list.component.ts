import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  title: string = 'Vendor Manager';

  constructor(
    private vendorSvc: VendorService,
    private sysSvc: SystemService
    ) { }

  ngOnInit(): void {
    this.vendorSvc.list().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
      },
        err => { console.log(err);}
        );
  }

}
