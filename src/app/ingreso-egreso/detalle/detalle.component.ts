import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  public items = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('ingreso_egresos')
      .pipe(filter(doc => doc.items != null))
      .subscribe(data => {
        this.items = data.items;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public eliminarItem(item: IngresoEgreso) {
    this.ingresoEgresoService
      .eliminarItem(item.uid)
      .then(() => {
        Swal.fire(
          'Item eliminado',
          `Se ha removido ${item.descripcion} de la lista de ingresos-egresos.`,
          'success',
        );
      })
      .catch(error => {
        Swal.fire('Se ha producido un error', error.message, 'error');
      });
  }
}
