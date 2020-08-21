import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { defaultPrice, ProductDto, ApiManagerService, PriceDtoArray, ValidationExp } from '@app/core';
import { NotifierService } from 'angular-notifier';


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
    private readonly apiService: ApiManagerService,
    private readonly notifier: NotifierService
  ) { }

  /**
   * Check if this is editing or adding product mode
   */
  get isEditing(): boolean { return null != this.parentData.product; }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      price: ['', [Validators.required, Validators.pattern(ValidationExp.PricePattern)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      photoSrc: ['', [Validators.required, Validators.pattern(ValidationExp.ImgSrcPattern)]]
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
      this.parentData.product = null;
      this.productForm.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
       return;
    }
    const price: PriceDtoArray = [
      {
        id: 1,
        value: parseFloat(this.productForm.value.price.replace(',', '.'))
      }
    ];
    const product: ProductDto = {
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
    const currentProduct = this.parentData.product;
    product.id = currentProduct.id;
    this.apiService.editData(product.id, product)
      .subscribe(_ => {
        currentProduct.name = product.name;
        currentProduct.description = product.description;
        currentProduct.image = product.image;
        currentProduct.prices = product.prices;
        this.notifier.notify('success', `Zaktualizowano produkt ${product.name}`);
        this.closeModal();
      });
  }

  createProduct(product: ProductDto) {
    this.apiService.postData(product)
      .subscribe(resp => {
        this.parentData.products.push(resp);
        this.notifier.notify('success', `Dodano produkt ${product.name}`);
        this.closeModal();
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
