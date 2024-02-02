import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { array } from '@amcharts/amcharts5';
import { PrescribedDataService } from '../../services/prescribed-data.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements OnInit {
  myForm: FormGroup;

  allConsultation: any;


  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private prescribeDtService: PrescribedDataService) { }

  ngOnInit() {

    this.consultationForm();
    this.getAllConsultation();
  }
  getAllConsultation() {
    this.httpService.getConsultation().subscribe((res) => {
      this.allConsultation = res;
      this.prescribeDtService.setValue(res);
    }
      ,
      (err) => {
        console.log(err);

      })
  }

  consultationForm() {
    this.myForm = this.fb.group({
      patientName: ['', Validators.required],
      age: ['', Validators.required],
      physicianName: ['', Validators.required],
      gender: ['', Validators.required],
      prescribedTest: ['', Validators.required]
    });
  }




  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.httpService.saveConsultation(form.value).subscribe((data) => {
      console.log(data);
      form.reset();
      this.getAllConsultation();
      window.location.reload();


    },
      (err) => {
        console.log(err);

      })

  }

}
