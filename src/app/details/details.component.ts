import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) short!:MatSort;
  
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeMobileNo', 'employeeEmail', 'view', 'edit','delete'];
  dataSource: any;
  details:any;

  constructor(
    public db:AngularFirestore,
    public AngularFirestore: AngularFirestore,
    private router: Router,
    private dialog:MatDialog,){
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

ngOnInit():void{
  this.AngularFirestore.collection("employeedetails").valueChanges().subscribe( required =>
    {
      console.log(required);
      this.details=required;
      this.dataSource=new MatTableDataSource(this.details);
      console.log(this.dataSource);

      this.dataSource.paginator =this.paginator;
      this.dataSource.sort = this.short;
    });
}

onrowview(datasId:any){
  console.log(datasId);
  this.router.navigateByUrl(`/view/${datasId}`)
}

onrowedit(datasId: any){
  console.log(datasId);
  this.router.navigateByUrl(`/edit/${datasId}`)
    
 }

 onrowdelete(datasId: any){
  if(confirm("Are you sure to delete this record")){
    this.AngularFirestore.doc('employeedetails/'+datasId).delete();
  }

}
}
