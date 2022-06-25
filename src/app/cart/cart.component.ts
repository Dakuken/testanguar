import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

interface Errors {
  name: string;
  message: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items = this.cartService.getItems();
  inputErrors: Errors[] = [];

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    let nameError = this.inputErrors.findIndex(
      (error: Errors) => error.name === 'ErreurName'
    );
    let adressError = this.inputErrors.findIndex(
      (error: Errors) => error.name === 'ErreurAdd'
    );

    if (
      this.checkoutForm.value.name === '' ||
      this.checkoutForm.value.name == null
    ) {
      if (nameError === -1) {
        this.inputErrors.push({
          name: 'ErreurName',
          message: 'Euh faut rentrer un nom frérot',
        });
      }
    } else {
      if (nameError !== -1) {
        this.inputErrors.splice(nameError, 1);
      }
    }

    if (
      this.checkoutForm.value.address === '' ||
      this.checkoutForm.value.address == null
    ) {
      if (adressError === -1) {
        this.inputErrors.push({
          name: 'ErreurAdd',
          message: 'Euh faut rentrer une adresse',
        });
      }
    } else {
      if (adressError !== -1) {
        this.inputErrors.splice(adressError, 1);
      }
    }

    nameError = this.inputErrors.findIndex(
      (error: Errors) => error.name === 'ErreurName'
    );
    adressError = this.inputErrors.findIndex(
      (error: Errors) => error.name === 'ErreurAdd'
    );
    if (nameError !== -1 || adressError !== -1) {
      return;
    }

    this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
