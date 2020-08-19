import { Component, OnInit, Input } from '@angular/core';

import { SessionStorageService } from '@app/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '@app/shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() singleProduct;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(
    private readonly sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
  }
  // check if it's admin view
  get isAdmin() { return this.sessionStorageService.getUserData('userRole').role === UserRole.Admin }
}
