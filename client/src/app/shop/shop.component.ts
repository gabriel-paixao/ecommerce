import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  public loading: boolean = false;
  public products: IProduct[] = [];
  public brands: IBrand[] = [];
  public types: IType[] = [];
  public shopParams: ShopParams = new ShopParams();
  public totalCount: number = 0;
  public sortOptions: any[] = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price High to Low', value: 'priceDesc' },
    { name: 'Price Low to High', value: 'priceAsc' },
  ];



  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  //Public Methods
  public onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  public onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  public onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }
  public onPageChanged(event: any): void {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  public onSearch(): void {
    this.shopParams.search = this.searchTerm!.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  public onReset(): void {
    this.searchTerm!.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  //Private Methods
  private getProducts(): void {
    this.loading = true;
    this.shopService.getProducts(this.shopParams).subscribe(
      response => {
        this.products = response?.data!;
        this.shopParams.pageNumber = response?.pageIndex!;
        this.shopParams.pageSize = response?.pageSize!;
        this.totalCount = response?.count!;
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    );
  }
  private getBrands(): void {
    this.loading = true;
    this.shopService.getBrands().subscribe(
      response => {
        this.brands = [
          {
            id: 0,
            name: 'All'
          },
          ...response
        ];
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    );
  }
  private getTypes(): void {
    this.loading = true;
    this.shopService.getTypes().subscribe(
      response => {
        this.types = [
          {
            id: 0,
            name: 'All'
          },
          ...response
        ]
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    );
  }
}
