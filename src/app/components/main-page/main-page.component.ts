import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '@app/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products;

  constructor(
    private readonly apiService: ApiManagerService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getData().
      subscribe(products =>
        this.products = products
      )
  }

}
