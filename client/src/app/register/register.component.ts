import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  maxDate: Date = new Date();
  faculties: any[] = [];
  cycles: any[] = [];
  specializations: any[] = [];
  selectedFaculty: number;
  selectedCycle: number;
  selectedSpecialization: number;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadFaculties();
  }

  selectFaculty(event: any) {
    this.specializations = [];
    this.selectedFaculty = event.target.value;
    if (this.selectedCycle) this.selectSpecialization();
  }

  selectCycle(event: any) {
    this.selectedCycle = event.target.value;
    if (this.selectedFaculty) this.selectSpecialization();
  }

  selectSpecialization() {
    this.accountService
      .getSpecializations(this.selectedFaculty, this.selectedCycle)
      .subscribe({
        next: (sp) => {
          this.specializations = sp;
        },
      });
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      specializationId: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      },
    });
    this.registerForm.removeControl('faculty');
    this.registerForm.removeControl('cycle');
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register() {
    const dob = this.getDateOnly(
      this.registerForm.controls['dateOfBirth'].value
    );
    const values = { ...this.registerForm.value, dateOfBirth: dob };
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(
      theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }

  private loadFaculties() {
    this.accountService.getFaculties().subscribe({
      next: (faculties) => (this.faculties = faculties),
    });

    this.accountService.getCycles().subscribe({
      next: (cycles) => (this.cycles = cycles),
    });

    this.selectedFaculty = 1;
    this.selectedCycle = 1;
    this.selectSpecialization();
  }
}
