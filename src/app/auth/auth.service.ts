import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import 'firebase/firestore';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from '../share/ui.actions';
import { SetUserAction } from './auth.actions';
import { User } from './auth.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subscription: Subscription = new Subscription();
  public user: User;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private store: Store<AppState>,
  ) {}

  public crearUsuario(nombre: string, email: string, password: string) {
    const actionLoadingActivar = new ActivarLoadingAction();
    this.store.dispatch(actionLoadingActivar);

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp: any) => {
        this.firestore
          .collection(resp.user.uid)
          .doc('usuario')
          .set({ nombre, email, password, uid: resp.user.uid })
          .then(() => {
            this.router.navigate(['/dashboard']);
            const actionLoadingDesactivar = new DesactivarLoadingAction();
            this.store.dispatch(actionLoadingDesactivar);
          })
          .catch(error => {
            const actionLoadingDesactivar = new DesactivarLoadingAction();
            this.store.dispatch(actionLoadingDesactivar);
            this.auth.signOut();
            Swal.fire('Tenemos problemas', error.message, 'error');
          });
      })
      .catch(error => {
        const actionLoadingDesactivar = new DesactivarLoadingAction();
        this.store.dispatch(actionLoadingDesactivar);
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public login(email: string, password: string) {
    const actionLoadingActivar = new ActivarLoadingAction();
    this.store.dispatch(actionLoadingActivar);

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const actionLoadingDesactivar = new DesactivarLoadingAction();
        this.store.dispatch(actionLoadingDesactivar);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        const actionLoadingDesactivar = new DesactivarLoadingAction();
        this.store.dispatch(actionLoadingDesactivar);
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        const subscription = this.firestore
          .doc(`${user.uid}/usuario`)
          .valueChanges()
          .subscribe((usuario: User) => {
            this.store.dispatch(new SetUserAction(new User(usuario), true));
            (this.user = new User(usuario)), true;
          });
      } else {
        this.subscription.unsubscribe();
      }
    });
  }

  public isAuth() {
    return this.auth.authState.pipe(
      map(user => {
        if (user == null) {
          this.router.navigate(['login']);
        }

        return user != null;
      }),
    );
  }

  public getUsuario() {
    return { ...this.user };
  }
}
