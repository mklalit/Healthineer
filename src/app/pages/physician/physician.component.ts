import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrl: './physician.component.scss'
})
export class PhysicianComponent implements OnInit {
  myForm: FormGroup;
  allPhysician: any = [];
  isDisabled: boolean = false;
  btnText: string = 'Add';
  mode: string = 'add';
  currentd: any = null;


  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) { }


  ngOnInit() {

    this.physicianForm();
    this.getAllPhysician()

  }

  getAllPhysician() {
    this.httpService.getPhysicians().subscribe((res) => {
      this.allPhysician = res;
    }, err => {
      console.log(err);

    })
  }

  physicianForm() {
    this.myForm = this.fb.group({
      physicianName: ['', Validators.required],
      age: ['', Validators.required],
      specialization: ['', Validators.required],
      gender: ['', Validators.required],
      qualification: ['', Validators.required]
    });
  }


  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    if (this.mode == 'add') {
      this.httpService.savePhysicians(form.value).subscribe((res) => {
        this.getAllPhysician();
        this.btnText = 'Add'
        this.resetForm();
      }, err => {
        console.log(err);

      })
    } else {
      this.myForm.get('physicianName')?.enable();
      this.httpService.updatePhysicians(this.currentd, form.value).subscribe((res) => {
        this.currentd = null;
        this.mode = 'add';
        this.getAllPhysician();
        this.resetForm();

      }, err => {
        console.log(err);

      })
    }


  }

  setForm(data: any, mode: string) {
    this.mode = mode;
    this.currentd = data.id;
    if (mode) {
      let patchData = {
        physicianName: data.physicianName,
        age: data.age,
        specialization: data.specialization,
        gender: data.gender,
        qualification: data.qualification,

      }

      this.myForm.patchValue(patchData);
      this.myForm.get('physicianName')?.disable();
      this.btnText = 'Update';

    }
  }

  resetForm() {
    this.myForm.get('physicianName')?.enable();
    this.myForm.get('specialization')?.patchValue(' ');
    this.btnText = 'Add';
    this.currentd = null;
    this.myForm.reset();

  }

}
