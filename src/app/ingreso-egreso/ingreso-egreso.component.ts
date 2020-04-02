import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from '../share/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public formIngresoEgreso: FormGroup;
  public tipo = 'ingreso';
  public isLoading: boolean;
  public loadingSubscription: Subscription = new Subscription();

  constructor(
    private ingresoService: IngresoEgresoService,
    private store: Store<AppState>,
  ) {
    this.formIngresoEgreso = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui').subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  public createIngreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({
      ...this.formIngresoEgreso.value,
      tipo: this.tipo,
    });

    this.ingresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.formIngresoEgreso.reset({ monto: 0 });
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
      })
      .catch((error: any) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error', error.message, 'error');
      });
  }
}
