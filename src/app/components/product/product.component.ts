import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SessionStorageService, defaultPrice } from '@app/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '@app/shared';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() singleProduct;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  defaultPrice = defaultPrice;

  constructor(
    private readonly sessionStorageService: SessionStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  // check if it's admin view
  get isAdmin() { return this.sessionStorageService.getUserData('userRole').role === UserRole.Admin }

  openModal(mode: string) {
    const modalRef = this.modalService.open(AddEditProductComponent);

    let data = {
      mode: mode,
      product: this.singleProduct
    }

    modalRef.componentInstance.parentData = data;
  }
}
