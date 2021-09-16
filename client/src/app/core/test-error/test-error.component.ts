import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  private baseUrl: string = environment.apiUrl;
  public validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public get404Error(): void {
    this.http.get(this.baseUrl + 'products/42').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
  public get500Error(): void {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
  public get400Error(): void {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
  public get400ValidationError(): void {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        this.validationErrors = error.errors;
      });
  }
}