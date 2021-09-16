import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl: string = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  public getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append("brandId", shopParams.brandId);
    }

    if (shopParams.typeId !== 0) {
      params = params.append("typeId", shopParams.typeId);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append("sort", shopParams.sort);

    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  public getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  public getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  public getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
