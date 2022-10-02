import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private authServ: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  submitLoginForm() {
    this.loading = true;

    this.authServ
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
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
