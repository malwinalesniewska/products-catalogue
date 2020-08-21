import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService, defaultPrice, ApiManagerService } from '@app/core';
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
  @Output() onDeleteProduct: EventEmitter<any> = new EventEmitter<any>();

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  defaultPrice = defaultPrice;

  constructor(
    private readonly sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
    private readonly apiService: ApiManagerService
  ) { }

  ngOnInit() {
  }
  // check if it's admin view
  get isAdmin() { return this.sessionStorageService.getUserData('userRole').role === UserRole.Admin }

  openModal() {
    const modalRef = this.modalService.open(AddEditProductComponent);

    let data = {
      product: this.singleProduct
    }

    modalRef.componentInstance.parentData = data;
  }

  onDelete() {
    this.apiService.deleteData(this.singleProduct.id)
      .subscribe(_ => {
        this.onDeleteProduct.emit();
        alert(`Usunięto produkt ${this.singleProduct.name}`);
      })
  }
}
