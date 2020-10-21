import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
form:FormGroup;
product_picture:File;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title':new FormControl(null,{validators:[Validators.required]}),
    })
  }

  fileChange(event:Event){
    this.product_picture = <File>(event.target as HTMLInputElement).files[0];  
  }

    post(){
    const postData = new FormData();
    postData.append('title',this.form.value.title);
    postData.append('product_picture', this.product_picture,this.product_picture.name);
     this.http.post('http://localhost:3000/product',postData).subscribe(data=>{
            console.log(data);
    })
  }

}
