import { Component, Input, OnInit } from '@angular/core';
import { GetproductserviceService } from './getproductservice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import { AddProductServiceService } from '../addproduct/add-product-service.service';
import { ModalformComponent } from './modalform/modalform.component';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})

export class ViewproductsComponent implements OnInit {
 
  
  a:Product[] = [];
  check = false;
  productlist:any;
  constructor(private getproductservive:GetproductserviceService,private modalService: NgbModal)  { 
    this.getproductservive.getProduct(localStorage.getItem('userId')).subscribe(data=>{
      this.productlist=data;
    });
    
  }
  open(pname:any,pdesc:any,pprice:any,pid:any) {
    const modalRef = this.modalService.open(ModalformComponent);
    modalRef.componentInstance.pname = pname;
    modalRef.componentInstance.pdesc = pdesc;
    modalRef.componentInstance.pprice = pprice;
    modalRef.componentInstance.pid = pid;
    // modalRef.componentInstance.pimg = pimg;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  ngOnInit(): void {
  }

}

export interface Product {
  id: number;
  quantity: number;
}

// @Component({
//   selector: 'ngbd-modal-content',
//   templateUrl: './model-comp.html'
// })
// export class NgbdModalContent {
//   @Input() pname:any;
//   @Input() pimg:any;
//   @Input() pdesc:any;
//   @Input() pprice:any;
//   @Input() pid:any;
//   addproductform: any;
//   constructor(public activeModal: NgbActiveModal,private formbuilder: FormBuilder, private addproductService: AddProductServiceService) {
//     this.addproductform = this.formbuilder.group({
//       pname: ['', [Validators.required, Validators.minLength(3)]],
//       pdesc: ['', [Validators.required, Validators.minLength(3)]],
//       pprice: ['', [Validators.required]],
//       // pimage : ['', [Validators.required,]],
//       // pimagesource : ['', [Validators.required,]],
//     });
//   }
// }