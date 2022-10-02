import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private authServ: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  submitRegisterForm() {
    this.loading = true;

    this.authServ
      .register(
        this.registerForm.get('name')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (httpError: HttpErrorResponse) => {
          const newErrors: string[] = [];

          Object.keys(httpError.error.errors).forEach((errorKey) => {
            httpError.error.errors[errorKey].forEach((errorMessage: string) => {
              newErrors.push(`${errorKey} ${errorMessage}`);
            });
          });

          this.errors = newErrors;
          this.loading = false;
        },
      });
  }
}
