import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { UnSetUserAction } from '../../auth/auth.actions';
import { UnSetIemsAction } from '../../ingreso-egreso/ingreso-egreso.action';
import { AuthService } from '../../auth/auth.service';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public nombre: string;
  private Subscripcion: Subscription = new Subscription();

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService,
  ) {}
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

  public doLogOut() {
    this.auth
      .signOut()
      .then(() => {
        this.store.dispatch(new UnSetUserAction());
        this.store.dispatch(new UnSetIemsAction());
        this.ingresoEgresoService.cancelarSubscripciones();
        this.router.navigate(['/login']);
      })
      .catch(error => {
        Swal.fire('Error al cerrar sesión', error.message, 'error');
      });
  }
}
