import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public isLoading: boolean;
  public suscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private store: Store<AppState>,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.suscription = this.store.select('ui').subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  public onSubmit() {
    this.authService.crearUsuario(
      this.registerForm.controls.name.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
    );
  }
}
