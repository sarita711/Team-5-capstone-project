import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isCompanyUser = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userType: ['normal', Validators.required],
      companyId: [''],  // No validation initially
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  

  // Toggle companyId field based on user type
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
  

  // Check if passwords match before submitting
  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Form is not valid', this.registerForm);  // Log the entire form
      this.registerForm.markAllAsTouched();  // Mark all fields as touched to show errors
    }
  }
  
}
