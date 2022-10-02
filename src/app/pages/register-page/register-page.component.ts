import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }
}
