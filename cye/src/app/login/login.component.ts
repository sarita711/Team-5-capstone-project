import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['normal', Validators.required]
    });
  }
 
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log('Form Submitted', this.loginForm.value);
    }
  }
}
 
