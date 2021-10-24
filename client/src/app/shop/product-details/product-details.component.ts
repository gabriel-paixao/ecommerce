import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product!: IProduct;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(+id).subscribe(
      prod => {
        this.product = prod;
        this.breadcrumbService.set('@productDetails', this.product.name);
      },
      error => {
        console.log(error);
      })
  }

}
