import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddProductServiceService } from './add-product-service.service';
import { ImageUploadServiceService } from './uploadimage/image-upload-service.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  addproductform: any;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: any;
  constructor(
    private formbuilder: FormBuilder,
    private addproductService: AddProductServiceService,
    private fileUploadService: ImageUploadServiceService
  ) {
    this.addproductform = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      pimage: [''],
    });
  }

  ngOnInit(): void {}

  get title() {
    return this.addproductform.get('title');
  }
  get description() {
    return this.addproductform.get('description');
  }
  get price() {
    return this.addproductform.get('price');
  }
  get pimage() {
    return this.addproductform.get('image');
  }

  postproduct() {
    this.loading = !this.loading;
    console.log(this.file);
    // this.fileUploadService.upload(this.file).subscribe(
    //     (event: any) => {
    //         if (typeof (event) === 'object') {

    //             // Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable
    //         }
    //     },(err) => {
    //       console.log(err);
    //     }
    // );
    //     console.log(this.shortLink);
    let prod = {
      userId: localStorage.getItem('userId'),
      title: this.addproductform.value.title,
      description: this.addproductform.value.description,
      price: this.addproductform.value.price,
      image: this.addproductform.value.image,
    };
    this.addproductService.postData(prod).subscribe((res: any) => {
      console.log(res);
      if (res.message) {
        alert('Product Added Successfully');
        this.addproductform.reset();
      } else {
        alert('Product Not Added');
        this.addproductform.reset();
      }
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
}
