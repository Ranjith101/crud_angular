import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  education:string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ]
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
     
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){

      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any) =>{
            console.log(val)
            // alert("Employee Updated")
            this._coreService.openSnackBar('Employee Updated')
            this._dialogRef.close(true)
          },
          error: (err: any)=>{
            console.error(err)
          }
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val:any) =>{
            // console.log(val)
            // alert("Employee added successfully")
            this._coreService.openSnackBar('Employee added successfully')
            this._dialogRef.close(true)
          },
          error: (err: any)=>{
            console.error(err)
          }
        })
      }

      // this._empService.addEmployee(this.empForm.value).subscribe({
      //   next:(val:any) =>{
      //     console.log(val)
      //     alert("Employee added successfully")
      //     this._dialogRef.close(true)
      //   },
      //   error: (err: any)=>{
      //     console.error(err)
      //   }
      // })
    }
  }
  }
