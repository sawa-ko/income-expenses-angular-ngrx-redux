import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public nombre: string;
  private Subscripcion: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.Subscripcion = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(state => {
        this.nombre = state.user.nombre;
      });
  }

  ngOnDestroy(): void {
    this.Subscripcion.unsubscribe();
  }
}
