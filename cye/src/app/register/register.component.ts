import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});

  isCompanyUser = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userType: ['normal', Validators.required],
      companyId: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onUserTypeChange(event: Event): void {
    const userType = (event.target as HTMLSelectElement).value;
    this.isCompanyUser = userType === 'company';
    if (this.isCompanyUser) {
      this.registerForm.get('companyId')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('companyId')?.clearValidators();
    }
    this.registerForm.get('companyId')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
