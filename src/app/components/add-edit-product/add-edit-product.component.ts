import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { defaultPrice, ProductDto } from '@app/core';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  @Input() parentData;

  productForm: FormGroup;
  productAddEditModal: NgbModalRef;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder
  ) { }

  /**
   * Check if this is editing or adding product mode
   */
  get isEditing(): boolean { return null != this.parentData.product; }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      photoSrc: ['', [Validators.required]]
    });
    this.modalOpened();
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get frm() { return this.productForm.controls; }

  modalOpened() {
    const product = this.parentData.product;
    this.submitted = false;
    if (null != product) {
      this.productForm.patchValue({
        name: product.name,
        price: product.prices[defaultPrice],
        description: product.description,
        photoSrc: product.image
      });
    } else {
      this.parentData.product= null;
      this.productForm.reset();    
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
       return;
    }
    let product: ProductDto = {
        id: null,
        name: this.productForm.value.name,
        prices: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.photoSrc
    };
    if (this.isEditing) {  
      this.updateProduct(product);    
    } else {      
      this.createProduct(product);    
    }  
  }

  updateProduct(product) {
    product.id = this.parentData.product.id;
    console.log(product);
  }

  createProduct(product) {

  }
  
  closeModal() {
    this.activeModal.close();
  }
}
