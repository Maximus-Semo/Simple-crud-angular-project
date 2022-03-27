import { Component, OnInit, ViewChild } from '@angular/core'; // جدول view
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApiService } from './service/api.service';

import {MatPaginator} from '@angular/material/paginator'; // جدول
import {MatSort} from '@angular/material/sort'; // جدول
import {MatTableDataSource} from '@angular/material/table'; // جدول

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular13Crud';
  displayedColumns: string[] = ['productName', 'category', "data", "freshess", 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(public dialog: MatDialog, private api : ApiService) {}
  ngOnInit(): void {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"40%"
    }).afterClosed().subscribe(val=> {
      if(val == 'save'){
        this.getAllProducts(); // check about them
      }
    })
  }

  getAllProducts(){
    this.api.getProdcut()
    .subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }, error:(err) => {
        alert("error whil feching");
      }
    })
  }

  editProduct(row : any ){
    this.dialog.open(DialogComponent,{
      width:"30%",
      data: row
    }).afterClosed().subscribe(val=> {
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProudct(id)
    .subscribe({
      next:(res)=>{
        alert("product Deleted succssfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error While deleting the product!!")
      }
    })
  }
 
  // this copy on table ts 
   applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


