import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading: boolean;
  public suscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private store: Store<AppState>,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.suscription = this.store.select('ui').subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  public onSubmit() {
    this.authService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value,
    );
  }
}
