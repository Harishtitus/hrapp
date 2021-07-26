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

interface Company{
  value: string;
  viewValue: string;
}

interface Gender{
  value: string;
  viewValue: string;
}

interface Department{
  value: string;
  viewValue: string;
}

interface BloodGroup{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

 datasId: any
 error:any
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

Company: Company[] = [
  {value: 'Antano&Harini', viewValue: 'Antano&Harini'},
  {value: 'School Of Excellence', viewValue: 'School Of Excellence'},
  {value: 'other', viewValue: 'other'},
];

Gender: Gender[] = [
  {value: 'Male', viewValue: 'Male'},
  {value: 'Female', viewValue: 'Female'},
  {value: 'other', viewValue: 'other'},
];

Department: Department[] = [
  {value: 'HR', viewValue: 'HR'},
  {value: 'Finance', viewValue: 'Finance'},
  {value: 'Accounts', viewValue: 'Accounts'},
  {value: 'Delivery', viewValue: 'Delivery'},
  {value: 'Sales', viewValue: 'Sales'},
  {value: 'Production', viewValue: 'Production'},
  {value: 'IT/Tech', viewValue: 'IT/Tech'},
];

BloodGroup: BloodGroup[] = [
  {value: 'A(+)Positive', viewValue: 'A(+)Positive'},
  {value: 'B(+)Positive', viewValue: 'B(+)Positive'},
  {value: 'O(+)Positive', viewValue: 'O(+)Positive'},
  {value: 'AB(+)Positive', viewValue: 'AB(+)Positive'},
  {value: 'A(-)Negative', viewValue: 'A(-)Negative'},
  {value: 'B(-)Negative', viewValue: 'B(-)Negative'},
  {value: 'O(-)Negative', viewValue: 'O(-)Negative'},
  {value: 'AB(-)Negative', viewValue: 'AB(-)Negative'},
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
    public db:AngularFirestore,
    public crud:CrudService,
    private route:ActivatedRoute,
    private firestore:AngularFirestore,
    public formbuilder: FormBuilder,
    private router:Router ) 
  {console.log(this.route.snapshot.params.Id)
    this.datasId=this.route.snapshot.params.Id
    this.db=db;
    
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

  onSubmit(value:any){
    console.log(value); 
    this.db.doc('/employeedetails/'+this.datasId).update({
      employeeId:value.employeeId,
      employeeName:value.employeeName,
      employeeCompany:value.employeeCompany,
      employeeDepartment:value.employeeDepartment,
      employeeDesignation:value.employeeDesignation,
      employeeEmail:value.employeeEmail,
      employeeMobileNo:value.employeeMobileNo,
      employeeJoiningDate:value.employeeJoiningDate,
      employeeReportingTo:value.employeeReportingTo,
      employeeDOB:value.employeeDOB,
      employeeWorkType:value.employeeWorkType,
      employeeGender:value.employeeGender,
      employeeBloodGroup:value.employeeBloodGroup,
      employeeAddress:value.employeeAddress,
      employeePhoto:value.employeePhoto,
    
      employeeType:value.employeeType,
      employeeOfficeBranch:value.employeeOfficeBranch,
      employeeGrade:value.employeeGrade,
      employeeInsurance:value.employeeInsurance,
      employeePFNo:value.employeePFNo,
      employeeESINo:value.employeeESINo,
      employeeLeavingDate:value.employeeLeavingDate,
    
      employeeBankAccountNo:value.employeeBankAccountNo,
      employeeBankName:value.employeeBankName,
      employeeAccountName:value.employeeAccountName,
      employeeIfscCode:value.employeeIfscCode,
      employeePaymentType:value.employeePaymentType,
      employeePANNo:value.employeePANNo,
    
      emmergencyContactName:value.emmergencyContactName,
      emmergencyContactNo:value.emmergencyContactNo,
      emmergencyContactEmail:value.emmergencyContactEmail,
      emmergencyContactAddress:value.emmergencyContactAddress,
    })
    
    .then(() => {
      console.log("successfully submitted");
      this.router.navigate(['/details'])
    })
    .catch(error => {
      console.error("Document Writing Error:",error);
    });
    }
}


