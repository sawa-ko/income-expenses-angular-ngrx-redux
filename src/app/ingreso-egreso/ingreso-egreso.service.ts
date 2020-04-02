import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetIemsAction } from './ingreso-egreso.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private ingresoEgresoListenerSub: Subscription = new Subscription();
  private ingresoEgresoItemsSub: Subscription = new Subscription();

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore
      .doc(`${this.authService.getUsuario().uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  public initIngresoEgresoListener() {
    this.ingresoEgresoListenerSub = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(state => {
        this.ingresoEgresoItems(state.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSub = this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as IngresoEgreso),
            };
          });
        }),
      )
      .subscribe((items: any) => {
        this.store.dispatch(new SetIemsAction(items));
      });
  }

  public cancelarSubscripciones() {
    this.ingresoEgresoItemsSub.unsubscribe();
    this.ingresoEgresoListenerSub.unsubscribe();
  }

  public eliminarItem(uid: string) {}
}
