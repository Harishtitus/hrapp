import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { EmployeeComponent } from '../employee/employee.component';
import { AngularFirestore} from '@angular/fire/firestore';

interface WorkType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

 datasId: any
 record: any
 floatLabelControl = new FormControl('auto');

 WorkType: WorkType[] = [
  {value: 'permanent', viewValue: 'Permanent'},
  {value: 'contract', viewValue: 'Contract'},
  {value: 'retainer', viewValue: 'Retainer'},
  {value: 'Temporary', viewValue: 'Temporary'},
  {value: 'probation', viewValue: 'Probation'},
  {value: 'intern', viewValue: 'Intern'}

];

 datasform : FormGroup = this.formbuilder.group({
    employeeId: [, { validators: [Validators.required], updateOn: "change" }],
    employeeName: [, { validators: [Validators.required], updateOn: "change" }],
    employeeCompany:[, { validators: [Validators.required], updateOn: "change" }],
    employeeDepartment: [, { validators: [Validators.required], updateOn: "change" }],
    employeeDesignation: [, { validators: [Validators.required], updateOn: "change" }],
    employeeEmail: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
    employeeMobileNo: [, { validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)], updateOn: "change" }],
    employeeJoiningDate: [, { validators: [Validators.required], updateOn: "change" }],
    employeeReportingTo: [, { validators: [Validators.required], updateOn: "change" }],
    employeeDOB: [, { validators: [Validators.required], updateOn: "change" }],
    employeeWorkType: [, { validators: [Validators.required], updateOn: "change" }],
    employeeGender: [, { validators: [Validators.required], updateOn: "change" }],
    employeeBloodGroup: [, { validators: [Validators.required], updateOn: "change" }],
    employeeAddress: [, { validators: [Validators.required], updateOn: "change" }],
    employeePhoto: [, { validators: [Validators.required], updateOn: "change" }],

    employeeType: [, { validators: [Validators.required], updateOn: "change" }],
    employeeOfficeBranch: [, { validators: [Validators.required], updateOn: "change" }],
    employeeGrade:[, { validators: [Validators.required], updateOn: "change" }],
    employeeInsurance: [, { validators: [Validators.required], updateOn: "change" }],
    employeePFNo: [, { validators: [Validators.required], updateOn: "change" }],
    employeeESINo: [, { validators: [Validators.required], updateOn: "change" }],
    employeeLeavingDate: [, { validators: [Validators.required], updateOn: "change" }],

    employeeBankAccountNo: [, { validators: [Validators.required], updateOn: "change" }],
    employeeBankName: [, { validators: [Validators.required], updateOn: "change" }],
    employeeAccountName:[, { validators: [Validators.required], updateOn: "change" }],
    employeeIfscCode: [, { validators: [Validators.required], updateOn: "change" }],
    employeePaymentType: [, { validators: [Validators.required], updateOn: "change" }],
    employeePANNo: [, { validators: [Validators.required], updateOn: "change" }],

    emmergencyContactName: [, { validators: [Validators.required], updateOn: "change" }],
    emmergencyContactNo: [, { validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)], updateOn: "change" }],
    emmergencyContactEmail: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
    emmergencyContactAddress: [, { validators: [Validators.required], updateOn: "change" }],
  });

  constructor(
    public crud:CrudService,
    private route:ActivatedRoute,
    private firestore:AngularFirestore,
    public formbuilder: FormBuilder,
    private router:Router ) 
  {console.log(this.route.snapshot.params.Id)
    this.datasId=this.route.snapshot.params.Id   
  this.firestore.collection("employeedetails").doc(this.datasId).get().toPromise().then((doc) => {
    this.record=doc.data()
    console.log(doc.data())
    this.datasform.patchValue({
        employeeId:this.record.employeeId,
        employeeName:this.record.employeeName,
        employeeCompany:this.record.employeeCompany,
        employeeDepartment:this.record.employeeDepartment,
        employeeDesignation:this.record.employeeDesignation,
        employeeEmail:this.record.employeeEmail,
        employeeMobileNo:this.record.employeeMobileNo,
        employeeJoiningDate:this.record.employeeJoiningDate,
        employeeReportingTo:this.record.employeeReportingTo,
        employeeDOB:this.record.employeeDOB,
        employeeWorkType:this.record.employeeWorkType,
        employeeGender:this.record.employeeGender,
        employeeBloodGroup:this.record.employeeBloodGroup,
        employeeAddress:this.record.employeeAddress,
        employeePhoto:this.record.employeePhoto,

        employeeType:this.record.employeeType,
        employeeOfficeBranch:this.record.employeeOfficeBranch,
        employeeGrade:this.record.employeeGrade,
        employeeInsurance:this.record.employeeInsurance,
        employeePFNo:this.record.employeePFNo,
        employeeESINo:this.record.employeeESINo,
        employeeLeavingDate:this.record.employeeLeavingDate,

        employeeBankAccountNo:this.record.employeeAccountName,
        employeeBankName:this.record.employeeBankName,
        employeeAccountName:this.record.employeeAccountName,
        employeeIfscCode:this.record.employeeIfscCode,
        employeePaymentType:this.record.employeePaymentType,
        employeePANNo:this.record.employeePANNo,

        emmergencyContactName:this.record.emmergencyContactName,
        emmergencyContactNo:this.record.emmergencyContactNo,
        emmergencyContactEmail:this.record.emmergencyContactEmail,
        emmergencyContactAddress:this.record.emmergencyContactAddress
    });
  })
  }
  ngOnInit(): void {
  }

}


