import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiManagerService } from '@app/core';
import { SessionStorageService, ProductDto } from '@app/core';
import { UserRole } from '@app/shared';
import { AddEditProductComponent } from './../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products: ProductDto;
  search = '';

  constructor(
    private readonly apiService: ApiManagerService,
    private readonly sessionStorageService: SessionStorageService,
    private modalService: NgbModal
  ) {}

  // check if it's admin view
  get isAdmin() { return this.sessionStorageService.getUserData('userRole').role === UserRole.Admin; }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getData().
      subscribe(products =>
        this.products = products
      );
  }

  onSetRole(role: string) {
    if (role === 'user') {
      this.sessionStorageService.setItem('userRole', UserRole.User);
    } else {
      this.sessionStorageService.setItem('userRole', UserRole.Admin);
    }
  }

  openAddProductModal() {
    const modalRef = this.modalService.open(AddEditProductComponent);
    const data = {
      product: null,
      products: this.products
    };
    modalRef.componentInstance.parentData = data;
  }
}
