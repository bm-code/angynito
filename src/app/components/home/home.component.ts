import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFooterComponent, NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subscription, interval } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { UploadPhotoComponent } from "../upload-photo/upload-photo.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzLayoutModule, NzGridModule, DatePipe, NzButtonModule, NzIconModule, NzCollapseModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzRadioModule, FooterComponent, NzFooterComponent, UploadPhotoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private fb: NonNullableFormBuilder, private httpClient: HttpClient, private message: NzMessageService, private router: Router) { }

  weddingDate = new Date(2024, 11, 23);
  title = 'angynito';
  countdown: { days: number, hours: number, minutes: number, seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  countdownDays: number = 0;
  loading: boolean = false;

  private subscription: Subscription = new Subscription();
  private formKey: string = 'mgvwzvyb';

  attendanceForm!: FormGroup<{
    attendance: FormControl<boolean>;
    name: FormControl<string>;
    companionName: FormControl<string>;
    intolerances: FormControl<string>;
    phone: FormControl<string>;
    busSeats: FormControl<number>;
    busUse: FormControl<string>;
    message: FormControl<string>;
  }>


  ngOnInit(): void {
    this.calculateCountdown();
    this.updateCountdown();
    this.subscription.add(interval(1000).subscribe(() => this.updateCountdown()));

    this.attendanceForm = this.fb.group({
      attendance: [true, [Validators.required]],
      name: ['', [Validators.required]],
      companionName: [''],
      intolerances: [''],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      busSeats: [1, [Validators.required]],
      busUse: ['', [Validators.required]],
      message: ['']
    });
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateCountdown() {
    const today = new Date();
    const timeDiff = this.weddingDate.getTime() - today.getTime();
    this.countdownDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  updateCountdown() {
    const now = new Date();
    const diff = this.weddingDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    this.countdown.days = days;
    this.countdown.hours = hours - days * 24;
    this.countdown.minutes = mins - hours * 60;
    this.countdown.seconds = secs - mins * 60;
  }

  submitForm() {

    let url = "https://formspree.io/f/" + this.formKey;

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };
    const formValues = {
      attendance: this.attendanceForm.get('attendance')?.value,
      name: this.attendanceForm.get('name')?.value,
      companionName: this.attendanceForm.get('companionName')?.value,
      intelorances: this.attendanceForm.get('intolerances')?.value,
      phone: this.attendanceForm.get('phone')?.value,
      busSeats: this.attendanceForm.get('busSeats')?.value,
      busUse: this.attendanceForm.get('busUse')?.value,
      message: this.attendanceForm.get('message')?.value
    }

    let data = `attendance=${formValues.attendance}&name=${formValues.name}&companionName=${formValues.companionName}&intolerances=${formValues.intelorances}&phone=${formValues.phone}&busSeats=${formValues.busSeats}&busUse=${formValues.busUse}&message=${formValues.message}`;
    let errorMessage: string = "";

    if (this.attendanceForm.valid) {
      this.loading = true;
      this.httpClient.post<any>(url, data, httpOptions).subscribe({
        next: () => {
          this.message.success('Gracias por confirmar tu asistencia',
            { nzDuration: 5000 }
          );
      this.loading = false;
      this.router.navigate(['/thanks']);
        },
        error: error => {
          errorMessage = error.message;
          this.message.error(errorMessage, { nzDuration: 5000 });
          this.loading = false;
        }
      })
    } else {
      Object.values(this.attendanceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

}
