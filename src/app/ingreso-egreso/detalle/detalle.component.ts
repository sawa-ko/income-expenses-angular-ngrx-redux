import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  public items = [];
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

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

  public eliminarItem(uid: string) {}
}
