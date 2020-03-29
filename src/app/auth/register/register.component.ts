import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}
