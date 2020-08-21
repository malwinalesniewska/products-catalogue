import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { defaultPrice, ProductDto, ApiManagerService, PriceDtoArray } from '@app/core';

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
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiManagerService
  ) { }

  /**
   * Check if this is editing or adding product mode
   */
  get isEditing(): boolean { return null != this.parentData.product; }

  ngOnInit() {
    // TODO: validate types, length etc
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
        price: product.prices[defaultPrice].value,
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
    let price: PriceDtoArray = [
      {
        id: 1,
        value: this.productForm.value.price
      }
    ]
    let product: ProductDto = {
        id: null,
        name: this.productForm.value.name,
        prices: price,
        description: this.productForm.value.description,
        image: this.productForm.value.photoSrc
    };
    if (this.isEditing) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  updateProduct(product: ProductDto): void {
  // TODO: add prices to array
    const currentProduct = this.parentData.product;
    product.id = currentProduct.id;
    this.apiService.editData(product.id, product)
      .subscribe(_ => {
        // currentProduct.addPrice(product.prices.push(currentProduct.prices));
        currentProduct.name = product.name;
        currentProduct.description = product.description;
        currentProduct.image = product.image;
        currentProduct.prices = product.prices;
        this.closeModal();
        alert(`Zaktualizowano produkt ${product.name}`);
      })
  }

  createProduct(product: ProductDto) {
    this.apiService.postData(product)
      .subscribe(resp => {
        this.parentData.products.push(resp);
        this.closeModal();
        alert(`Dodano produkt ${product.name}`);
      });      
  }
  
  closeModal() {
    this.activeModal.close();
  }
}
