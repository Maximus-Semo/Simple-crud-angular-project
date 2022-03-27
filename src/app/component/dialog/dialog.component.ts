import { ApiService } from 'src/app/service/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'AppDialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  freshnesList = ["Brand New", "Secound Hand", "Refurbished"];
  productForm! : FormGroup;
  actionBtn : string = "save";

  constructor(private formBuilder :FormBuilder,
  @Inject(MAT_DIALOG_DATA) public editData :any,
  private api :ApiService,
  private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void { // i need to understand more !!!

    this.productForm = this.formBuilder.group({ 
      
      productName! : ['', Validators.required],
      category! : ['', Validators.required],
      price! : ['', Validators.required],
      freshess! : ['', Validators.required],
      comment:! ['', Validators.required],
      data! : ['', Validators.required],
    }) 
    // on limit here !!!

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['freshess'].setValue(this.editData.freshess);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['data'].setValue(this.editData.data); 
    }
  }

  addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProdcut(this.productForm.value).subscribe({
        next:(res)=> {
          alert("proudact added successFully");
          this.productForm.reset();
          this.dialogRef.close("save");

        }, 
        error:()=> {
          alert("Error while adding the proudcter ")
        }
      })
    }
  } else {
    this.updateData();
  }
} 


updateData(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=> {
      alert("proudact updata sucssfuly")
      this.productForm.reset();
      this.dialogRef.close("update")
    }, error:()=>{
      alert("Error While updating the record")
    }
  })
}
  

}
