import { Component, OnInit } from '@angular/core';
import { GetproductserviceService } from './getproductservice.service';
import { PostproductserviceService } from './postproductservice.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  a: Product[] = [];
  check = false;
  productlist: any;
  products: any;
  userId: any;
  cart: any;
  loggedin = localStorage.getItem('role');
  constructor(private getproductservive: GetproductserviceService,
    private postproductservice: PostproductserviceService) {
    this.getproductservive.getProduct().subscribe(data => {
      this.productlist = data;
    });
    try {
      this.userId = localStorage.getItem('userId');
    }
    catch (e) {
      console.log(e);
    }
  }

  addtocart(pid: any) {
    if (this.loggedin) {
      console.log(pid);
      for (let i = 0; i < this.a.length; i++) {
        if (this.a[i].productId == pid) {
          this.check = true;
          this.a[i].quantity += 1;
          this.cart = {
            userId: this.userId,
            products: this.a
          }
          this.postproductservice.postProduct(this.cart).subscribe(data => {
            alert("Product added to cart");
          });
          break;
        }
      }
      if (!this.check) {
        this.a.push({
          productId: pid,
          quantity: 1
        });
        this.cart = {
          userId: this.userId,
          products: this.a
        }
        this.postproductservice.postProduct(this.cart).subscribe(data => {
          alert("Product added to cart");
        });
      }
      console.log(this.cart);
    }

  }
  ngOnInit(): void {
  }

}

export interface Product {
  productId: string;
  quantity: number;
}
