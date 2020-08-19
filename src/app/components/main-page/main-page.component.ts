import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '@app/core';
import { SessionStorageService } from '@app/core';
import { UserRole } from '@app/shared';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products;

  constructor(
    private readonly apiService: ApiManagerService,
    private readonly sessionStorageService: SessionStorageService
  ) { 
    this.sessionStorageService.setItem('userRole', UserRole.User);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getData().
      subscribe(products =>
        this.products = products
      )
  }

  onSetRole(role: string) {
    if (role === 'user') {
      this.sessionStorageService.setItem('userRole', UserRole.User)
    } else {
      this.sessionStorageService.setItem('userRole', UserRole.Admin)
    }
  }

}
